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
    origin: 'http://localhost:5173',
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

app.get("/", async (req, res) => {
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
