import express from "express";
import { sendNotification } from "../utils/notificationService.js";




export const checkRouter = express.Router();

checkRouter.post("/", async (req, res) => {
    try {
      
  
      res.send({ msg: "server running",  });
    } catch (error) {
      console.log(error);
  
      res.status(400).json({ msg: "error" });
    }
  });

checkRouter.post("/send", (req, res) => {
    const {msg} = req.body || "Hello, sir"
  sendNotification(msg);
  res.send({ msg: "email sent" });
});