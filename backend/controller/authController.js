import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Tenant from "../models/Tenant.js"
import axios from "axios"
import { generateToken } from '../utills/jswToken.js';

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
    const { firstName,lastName, email, password } = req.body;

    // 1. Validation
    if (!firstName || !email || !password) {
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
      firstName,
      lastName,
      email,
      passwordHash,
      role: 'owner' // default
    });

    // 5. JWT token
    const token =await  generateToken({id :user._id , firstName :user.name , email:user.email})

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
      return res.status(401).json({ message: "Email Not Found" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(String(password), user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is Incorrect" });
    }

    // 4. JWT token
    const token = await generateToken({id :user._id , name :user.firstName , email:user.email})

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
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
    const { code, state } = req.query;
    if (!code || !state) {
      return res.status(400).send("Invalid callback");
    }

    const { userId, type } = JSON.parse(decodeURIComponent(state));

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Exchange code for token
    const { access_token: userAccessToken } = await exchangeCodeForToken(code);

    if (type === "whatsapp") {
      await whatsappConnection(userId, userAccessToken);
    }
    else if (type === "instagram") {
      const { data } = await axios.get(
        "https://graph.facebook.com/v18.0/me/accounts",
        { params: { access_token: userAccessToken } }
      );
      await instagramConnection(data.data, userId, type);
    }
    else {
      const { data } = await axios.get(
        "https://graph.facebook.com/v18.0/me/accounts",
        { params: { access_token: userAccessToken } }
      );

      const page = data.data[0];

      const tenant = await Tenant.create({
        owner: userId,
        businessName: page.name,
        platform: type,
        page: {
          pageId: page.id,
          accessToken: page.access_token
        }
      });

      await User.findByIdAndUpdate(userId, {
        $push: {
          tenants: { name: type, tenantId: tenant._id }
        }
      });
    }

    return res.redirect(process.env.FRONTEND_SUCCESS_URL);

  } catch (err) {
    console.error("SOCIAL CONNECT ERROR:", err);
    return res.status(500).send(err.message);
  }
};


const instagramConnection = async (pages, userId, type) => {
  // Run all API calls in parallel
  const igResults = await Promise.all(
    pages.map(async (page) => {
      try {
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
          return {
            pageId: page.id,
            pageName: page.name,
            pageAccessToken: page.access_token,
            igBusinessId: igRes.data.instagram_business_account.id
          };
        }

        return null;
      } catch (err) {
        console.log("IG fetch failed for page:", page.id);
        return null;
      }
    })
  );

  const igPages = igResults.filter(Boolean);

  if (!igPages.length) {
    throw new Error("No Instagram business account linked");
  }

  // Pick first IG linked page
  const igPage = igPages[0];

  const tenant = await Tenant.create({
    owner: userId,
    businessName: igPage.pageName,
    platform : type,
    page: {
      pageId: igPage.pageId,
      igBusinessId: igPage.igBusinessId,
      accessToken: igPage.pageAccessToken
    }
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      tenants: { name: type, tenantId: tenant._id }
    }
  });

  return tenant;
};

const whatsappConnection = async (userId, accessToken) => {

  //  Get Business Managers
  const bmRes = await axios.get(
    "https://graph.facebook.com/v18.0/me/businesses",
    { params: { access_token: accessToken } }
  );

  const business = bmRes.data.data[0];
  if (!business) throw new Error("No Business Manager found");

  // Get WhatsApp Business Accounts
  const wabaRes = await axios.get(
    `https://graph.facebook.com/v18.0/${business.id}/owned_whatsapp_business_accounts`,
    { params: { access_token: accessToken } }
  );

  const waba = wabaRes.data.data[0];
  if (!waba) throw new Error("No WhatsApp Business Account found");

  // Get Phone Numbers
  const phoneRes = await axios.get(
    `https://graph.facebook.com/v18.0/${waba.id}/phone_numbers`,
    { params: { access_token: accessToken } }
  );

  const phone = phoneRes.data.data[0];
  if (!phone) throw new Error("No WhatsApp phone number found");

  // Save tenant
  const tenant = await Tenant.create({
    owner: userId,
    businessName: business.name,
    platform: "whatsapp",
    whatsapp: {
      businessId: business.id,
      wabaId: waba.id,
      phoneNumberId: phone.id,
      displayPhone: phone.display_phone_number,
      accessToken
    }
  });

  // Attach to user
  await User.findByIdAndUpdate(userId, {
    $push: {
      tenants: { name: "whatsapp", tenantId: tenant._id }
    }
  });

  return tenant;
};
