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



export const compactRules = `
You are SmartBizz AI assistant.

Business:
SmartBizz provides AI-powered tools for small and medium businesses.

Behavior:
- Be professional, polite, and business-focused
- Keep replies short, clear, and accurate
- Use English or Hindi only
- Do NOT use slang, emotional language, or aggressive tone

Knowledge Rules:
- Answer ONLY using provided business knowledge
- If information is missing, ask user to contact business owner

Products:
- AI Business Chatbot (Basic, Pro) — Available

Allowed:
- Explain products and services
- Guide customers politely
- Collect basic requirements

Restricted:
- No discounts without approval
- No competitor comparisons
- No legal, financial, or medical claims

Special Rules:
- If asked for discount → say: "Discounts are decided by the business owner."
- If product unavailable → say: "Currently unavailable. I can notify the owner."

Escalation:
- If user mentions complaint, refund, legal, angry, or wants owner:
  → Reply: "Transferring you to the business owner."
  → Stop replying until owner responds

Fallback:
- If unknown → "I don't have this info. Let me connect you with the owner."
`;

