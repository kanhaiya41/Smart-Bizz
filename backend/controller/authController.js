import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Tenant from "../models/Tenant.js"
import axios from "axios"


export async function exchangeCodeForToken(code) {
  try {
    const res = await axios.get(
      "https://graph.facebook.com/v18.0/oauth/access_token",
      {
        params: {
          client_id: process.env.META_APP_ID,
          client_secret: process.env.META_APP_SECRET,
          redirect_uri: process.env.META_REDIRECT_URI,
          code
        }
      }
    );

    if (!res.data?.access_token) {
      throw new Error("No access token from Meta");
    }
    return res.data;
  } catch (err) {
    console.log(err)
    throw new Error(
      err.response?.data?.error?.message || "OAuth exchange failed"
    );
  }
}


/* ===================== SIGN UP ===================== */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: 'owner' // default
    });

    // 5. JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenants: user.tenants
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const socialConnection = async (req, res) => {
  try {
    const { code, state: userId } = req.query;
    console.log(req.query);

    if (!code || !userId) {
      return res.status(400).send("Invalid callback");
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    //  Code → USER ACCESS TOKEN
    const tokenData = await exchangeCodeForToken(code);
    const userAccessToken = tokenData.access_token;

    console.log("USER ACCESS TOKEN:", userAccessToken);

    //  Get user's pages
    const pagesRes = await axios.get(
      "https://graph.facebook.com/v18.0/me/accounts",
      { params: { access_token: userAccessToken } }
    );

    const pages = pagesRes.data.data;
    console.log("PAGES:", pages);

    if (!pages || pages.length === 0) {
      throw new Error("No Facebook pages found");
    }

    const igPages = [];

    //  Find ALL pages which have IG business linked
    for (const page of pages) {
      const igRes = await axios.get(
        `https://graph.facebook.com/v18.0/${page.id}`,
        {
          params: {
            fields: "instagram_business_account",
            access_token: page.access_token
          }
        }
      );

      if (igRes.data.instagram_business_account) {
        igPages.push({
          pageId: page.id,
          pageName: page.name,
          pageAccessToken: page.access_token,
          igBusinessId: igRes.data.instagram_business_account.id
        });
      }
    }

    if (igPages.length === 0) {
      throw new Error("No Instagram business account linked");
    }

    //  Create tenants for each IG-linked page
    const createdTenants = [];

    for (const igPage of igPages) {
      const slug = igPage.pageName
        .toLowerCase()
        .replace(/\s+/g, "-");

      const tenant = await Tenant.create({
        owner: userId,
        businessName: igPage.pageName,
        slug,
        page: {
          pageId: igPage.pageId,
          igBusinessId: igPage.igBusinessId,
          accessToken: igPage.pageAccessToken
        }
      });

      createdTenants.push({
        name: igPage.pageName,
        tenantId: tenant._id
      });
    }

    console.log("createed Teanants ", createdTenants);


    //  Update user with all tenants
    const upadteduser = await User.findByIdAndUpdate(userId, {
      $push: {
        tenants: { $each: createdTenants }
      }
    }, { new: true });

    console.log("updateduser", upadteduser);


    return res.redirect(process.env.FRONTEND_SUCCESS_URL);

  } catch (err) {
    console.error("SOCIAL CONNECT ERROR:", err.message);
    return res.status(500).send(err.message);
  }
};






