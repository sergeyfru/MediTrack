import express from "express";
import cookieParser from "cookie-parser";
import { searchRouter } from "./router/search_router.js";
import { userRouter } from "./router/user_router.js";
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ 
    origin: ["http://localhost:5173","https://meditrack-s83s.onrender.com"],
    credentials: true 
}));
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(process.env.PORT || 3001, ()=>{
    console.log(`Server running at ${process.env.PORT || 3001}`);
})

app.use('/api/pills',searchRouter)
app.use('/api/users',userRouter)
app.use('/check', (req,res)=>{
    
    res.send({msg:'server running'})
})





