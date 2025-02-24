import express from 'express'
import {login, refreshToken, registration} from "../controllers/user_controllers.js";
import { checkUser } from '../controllers/user_controllers.js';


export const userRouter = express.Router()

userRouter.post('/registration', registration)
userRouter.post('/login',login)
userRouter.post('/refresh',refreshToken)
userRouter.post('/check',checkUser)