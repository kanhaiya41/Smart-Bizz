import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import path from "path";
import dbConnect from "./utills/dbConnect.js";
import authApp from "./routes/authRoutes.js";
import webhooks from "./routes/webhooks.js";
import superAdminApp from "./routes/superAdmin.routes.js";
import bussinessOwnerApp from "./routes/bussinessOwner.rotue.js";
import { initSocket } from "./utills/socket.js";
import axios from "axios";

dotenv.config();

const app = express();
const server = http.createServer(app); //VERY IMPORTANT

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use(express.json());

dbConnect();


// app.get("/auth/callback", async (req, res) => {
//   try {
//     const { code } = req.query;

//     // Exchange code for access token
//     const tokenRes = await axios.get(
//       "https://graph.facebook.com/v18.0/oauth/access_token",
//       {
//         params: {
//           client_id: process.env.META_APP_ID,
//           redirect_uri: process.env.META_REDIRECT_URI,
//           client_secret: process.env.META_APP_SECRET,
//           code: code
//         }
//       }
//     );

//     const tokenData = tokenRes.data;   //axios already parses JSON

//     if (!tokenData.access_token) {
//       return res.status(400).json(tokenData);
//     }

//     const accessToken = tokenData.access_token;

//     // Fetch business + WABA + phone numbers
//     const result = await fetchBusinessData(accessToken);

//     res.json({
//       success: true,
//       token: accessToken,
//       data: result
//     });

//   } catch (err) {
//     console.error("OAuth Error:", err.response?.data || err.message);
//     res.status(500).json({
//       success: false,
//       error: err.response?.data || err.message
//     });
//   }
// });

// async function getBusinesses(accessToken) {
//   const res = await fetch(
//     `https://graph.facebook.com/v18.0/me/businesses?access_token=${accessToken}`
//   );
//   const data = await res.json();
//   return data.data;
// }


// async function getPhoneNumbers(wabaId, accessToken) {
//   const res = await fetch(
//     `https://graph.facebook.com/v18.0/${wabaId}/phone_numbers?access_token=${accessToken}`
//   );
//   const data = await res.json();
//   return data.data;
// }

// async function getWABAs(businessId, accessToken) {
//   const res = await fetch(
//     `https://graph.facebook.com/v18.0/${businessId}/owned_whatsapp_business_accounts?access_token=${accessToken}`
//   );
//   const data = await res.json();
//   return data.data;
// }

// async function fetchBusinessData(accessToken) {
//   const businesses = await getBusinesses(accessToken);

//   let results = [];

//   for (const business of businesses) {
//     const wabas = await getWABAs(business.id, accessToken);

//     for (const waba of wabas) {
//       const phones = await getPhoneNumbers(waba.id, accessToken);

//       results.push({
//         businessId: business.id,
//         businessName: business.name,
//         wabaId: waba.id,
//         phoneNumbers: phones
//       });
//     }
//   }

//   return results;
// }


app.get("/", async(req, res) => {
    return res.send("All Runs");
});

app.use("/auth", authApp);
app.use("/webhook", webhooks);
app.use("/super-admin", superAdminApp);
app.use("/owner", bussinessOwnerApp);


//  init socket AFTER routes
initSocket(server);

server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
