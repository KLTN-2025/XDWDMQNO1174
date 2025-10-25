import express from "express";
import authRouter from "../routers/authRouter.js";
import userRouter from "../routers/userRouter.js";

const app = express();

// Gắn router vào ứng dụng con (mini app)
app.use("/api", authRouter); // ✅ Route: /api/auth/...
app.use("/api", userRouter); // ✅ Route: /api/user/...

export default app;
