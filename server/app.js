// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { connectToDb } from "./src/db/db.js";
// import userRoutes from "./src/routes/user.route.js";
// import authRoutes from "./src/routes/auth.route.js";
// import profileRoutes from "./src/routes/profile.route.js";
// import inquiryRoutes from './src/routes/inquiry.route.js';
// import shortlistProfileRoutes from "./src/routes/shortListedProfile.route.js";
// import interestedRoutes from "./src/routes/interested.route.js";
// import PartnerPreferenceRoutes from "./src/routes/partenerPreference.route.js";
// import cors from "cors";

// dotenv.config("./env");

// const app = express();
// const port = process.env.PORT || 7000;
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/profile", profileRoutes);
// app.use('/api/inquiries', inquiryRoutes);
// app.use("/api/interests", interestedRoutes);
// app.use("/api/partner-preference", PartnerPreferenceRoutes);
// app.use("/api/shortlist-profile", shortlistProfileRoutes);

// app.get("/", (req, res) => {
//   res.status(200).send("hello world");
// });

// app.listen(port, () => {
//   connectToDb();
//   console.log(`sever is running ${port} `);
// });


import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectToDb } from "./src/db/db.js";
import userRoutes from "./src/routes/user.route.js";
import authRoutes from "./src/routes/auth.route.js";
import profileRoutes from "./src/routes/profile.route.js";
import inquiryRoutes from './src/routes/inquiry.route.js';
import shortlistProfileRoutes from "./src/routes/shortListedProfile.route.js";
import interestedRoutes from "./src/routes/interested.route.js";
import messageRoutes from "./src/routes/message.route.js";
import PartnerPreferenceRoutes from "./src/routes/partenerPreference.route.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config("./env");

const app = express();
const port = process.env.PORT || 7000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // frontend origin
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use("/api/interests", interestedRoutes);
app.use("/api/partner-preference", PartnerPreferenceRoutes);
app.use("/api/shortlist-profile", shortlistProfileRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("send-message", (data) => {
    console.log("📨 Message Received:", data);
    socket.broadcast.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  connectToDb();
  console.log(`Server is running on port ${port}`);
});
