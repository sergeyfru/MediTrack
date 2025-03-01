import express from "express";

import {
  getAllUserPills,
  addPillToUser,
  removePillFromUser,
} from "../controllers/pills_controllers.js";

export const searchRouter = express.Router();

searchRouter.post("/all", getAllUserPills);
searchRouter.post("/addpill", addPillToUser);
searchRouter.delete("/remove", removePillFromUser);

