import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import dbConnect from "./utills/dbConnect.js";
import authApp from "./routes/authRoutes.js";
import webhooks from "./routes/webhooks.js";
import vectorApp from "./routes/vector.routes.js";
import superAdminApp from "./routes/superAdmin.routes.js";
import bussinessOwnerApp from "./routes/bussinessOwner.rotue.js";
import { initSocket } from "./utills/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // 👈 VERY IMPORTANT

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
    res.send("all runs");
});

app.use("/auth", authApp);
app.use("/webhook", webhooks);
app.use("/vector_db", vectorApp);
app.use("/super-admin", superAdminApp);
app.use("/owner", bussinessOwnerApp);


//  init socket AFTER routes
initSocket(server);

server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
