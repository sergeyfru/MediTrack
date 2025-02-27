import { verifyRefreshToken } from "../utils/auth"


export const verifyToken = (req,res,next)=>{
    
    const token = req.cookies.refreshToken
    if(!token){
        return res.status(401).json({msg:'No token provided'})
    }
    
    const decoded = verifyRefreshToken(token)

    if(!decoded){
       return res.status(403).json({msg:'Invalid token'})
    }

    req.user = {user_id:decoded.user_id}
    next()


}