import { _checkUser, _getUser, _login, _registration } from "../models/user_models.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/auth.js";

export const checkUser = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const { emailInDB, phoneInDB } = await _checkUser({ email, phone });

    res.send({ emailInDB, phoneInDB });
  } catch (error) {
    console.error("Users controllers CheckUser =>", error);
    res.status(404).json({ msg: "Error during checking" });
  }
};

export const registration = async (req, res) => {
  const { email, first_name, last_name, phone, password } = req.body;
  
  try {
    const { emailInDB, phoneInDB } = await _checkUser({ email, phone });
    console.log("emailInDB, phoneInDB", emailInDB, phoneInDB);

    if (emailInDB) {
      return res.json({show:true, msg: "This email is already registered!\nPlease enter another or recover your account." });
    }
    if (phoneInDB) {
     return res.json({show:true, msg: "This phone number is already registered!\nPlease enter another or recover your account." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password + "", salt);

    const newUser = await _registration({
      email,
      first_name,
      last_name,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ show:true, title:'Success', msg: "Registration successful!", user: newUser });
  } catch (error) {
    console.error("Users controllers Registration =>", error);
    res.status(400).json({title:'Error', msg: "Error during Registration" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { emailInDB } = await _checkUser({ email });
    if (!emailInDB) {
      return res.json({ show:true, msg: "This email is not registered.\nPlease sign up or check for typos." });
    }
    // if (!phoneInDB) {
    //  return res.json({ msg: "This phone number is already registered!\nPlease enter another or recover your account." });
    // }

    const { user, hashedPassword } = await _login({ email });

    const isMatch = bcrypt.compareSync(password + "", hashedPassword.password);
console.log(isMatch);

    if ( !isMatch) {
      console.log('no match');
      
      return res.status(200).json({ show:false,  msg: "Wrong email or password" });
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken',refreshToken,{
        http:true,
        maxAge:process.env.REFRESH_TOKEN_EXPIRY
    })

    res.status(200).json({ show:false, title:'Success',msg:'Logged in successfully',accessToken,user})


  } catch (error) {
    console.error("Users controllers Login =>", error);
    res.status(404).json({ msg: "Error during Login" });
  }
};

export const refreshToken = async(req,res)=>{
    try {
        console.log('in refresh');
        
        const refreshToken = req.cookies.refreshToken
        console.log(refreshToken);
        
    if(!refreshToken){
      return  res.status(401).json({ msg: 'No refresh token provided'})
    }

    const decoded = verifyRefreshToken(refreshToken)

    if(!decoded){
      return  res.status(403).json({ msg: 'Invalid refresh token'})
    }

    const user = await _getUser(decoded)

    const accessToken = generateAccessToken(user)

res.send({msg:'OK',accessToken})
    
    } catch (error) {
        console.error("Users controllers RefreshToken =>", error);
        res.status(404).json({ msg: "Error during RefreshToken" });
    }
}