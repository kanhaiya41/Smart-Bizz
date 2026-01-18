import jwt from "jsonwebtoken";


const SECRET_KEY = "SMARTBIZZ_KEY"

export  const generateToken =async (user) => {
    try {
        return await jwt.sign(user,SECRET_KEY, { expiresIn: "7d" });
    } catch (error) {
        console.log(`Error generating token: ${error}`);
        return null;
    }
};

export const verifyToken =(req, res, next) => {
    try {
        const authHeaders = req.headers["authorization"];
        if (!authHeaders) {
            return res.status(400).json({
                message: "No token Provided",
            });
        }
        // "Bearer <token>"
        const token = authHeaders.split(" ")[1];

         jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid Token or Expired",
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.log(`Error :${error}`);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export const login = async (req, res) => {
    try {
        const email = req.body?.email
        const password = req.body?.password

        if (!email || !password) return res.status(400).json({ message: 'Invalid credentials' })
        const user = await AuthUserModel.findOne({ email }).populate('refId');
        if (!user) return res.status(400).json({ message: 'Email Not Found' })

        const isMatch = String(user?.refId?.password) === String(password)
        // console.log(isMatch);
        // console.log( String(user?.refId?.password));
        // console.log( String(password));

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        let profile = null
        if (user?.role === "superadmin") {
            profile = await UserModel.findById(user?.refId)
        }
        else if (user?.role === "admin") {
            profile = await UserModel.findById(user?.refId)
        }
        else if (user?.role === "medicalDirector") {
            profile = await UserModel.findById(user?.refId)
        }
        else if (user?.role === "doctor") {
            profile = await UserModel.findById(user?.refId)
        }
        else if (user?.role === "personalAssitant") {
            profile = await UserModel.findById(user?.refId)
        }

        if (!profile) {
            return res.status(400).json({ message: 'Profile not found' });
        }

        const token = await generateToken({
            id: profile?._id,
            name: profile?.name,
            email: email,
        })

        return res.status(200).json({
            message: 'Login successful',
            role: profile?.role,  // full profile is sent here
            token: token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  // normal auth logic
  next();
};



export const defualtRulesheet = {
  "meta": {
    "version": "1.0",
    "purpose": "Control AI responses strictly based on business owner rules",
    "lastUpdated": "2026-01-18"
  },

  "businessBasics": {
    "businessName": "SmartBizz",
    "businessType": "Service / Product Based",
    "businessDescription": "SmartBizz provides AI-powered tools for small and medium businesses.",
    "targetCustomers": [
      "Small business owners",
      "Retail stores",
      "Service providers"
    ]
  },

  "aiBehavior": {
    "personality": "Professional, helpful, and business-focused",
    "responseStyle": "Clear, short, and accurate",
    "languagePreference": ["English", "Hindi"],
    "toneRestrictions": {
      "allowed": ["polite", "informative"],
      "notAllowed": ["aggressive", "casual slang", "emotional promises"]
    }
  },

  "knowledgeBase": {
    "productsOrServices": [
      {
        "name": "AI Business Chatbot",
        "description": "Automated customer support chatbot for businesses",
        "price": null,
        "variants": ["Basic", "Pro"],
        "availability": "Available"
      }
    ],
    "knowledgeRestriction": "AI must answer ONLY using this knowledge base. If data is missing, ask user to contact business owner."
  },

  "dosAndDonts": {
    "allowedActions": [
      "Explain products and services",
      "Guide customers politely",
      "Collect basic customer requirements"
    ],
    "restrictedActions": [
      "Offering discounts without approval",
      "Comparing with competitors",
      "Making legal, financial, or medical claims"
    ]
  },

  "ifThenRules": [
    {
      "condition": "WHEN customer asks for discount",
      "action": "Reply: 'Discount details are decided by the business owner. Please contact support.'"
    },
    {
      "condition": "WHEN customer asks about unavailable product",
      "action": "Reply: 'Currently this product is not available. I can notify the owner if you want.'"
    }
  ],

  "humanHandover": {
    "escalationKeywords": [
      "complaint",
      "legal",
      "refund",
      "angry",
      "speak to owner"
    ],
    "handoverMessage": "I am transferring this conversation to the business owner for better assistance.",
    "notificationMethod": "Dashboard + Email",
    "aiPauseRules": {
      "pauseAfterHandover": true,
      "resumeOnlyAfterOwnerReply": true
    }
  },

  "fallbackRule": {
    "unknownQueryResponse": "I don't have this information right now. Let me connect you with the business owner."
  }
}
