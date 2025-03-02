import path, { dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cookieParser from "cookie-parser";
import { searchRouter } from "./router/pills_router.js";
import { userRouter } from "./router/user_router.js";
import { checkRouter } from "./router/check_router.js";
import cors from "cors";
import dotenv from "dotenv";
// import './reminder/reminder.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://meditrack-s83s.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running at ${process.env.PORT || 3001}`);
});

app.use("/api/pills", searchRouter);
app.use("/api/users", userRouter);

app.use("/check", checkRouter)

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});
