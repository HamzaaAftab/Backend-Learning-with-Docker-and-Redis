import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async (req,res)=>{
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(404).json({ success: false, message: 'Invalid fields entered'})
        }
            // finding user with this email id se register toh nhi
        const user = await User.findOne({email});

        if(user){
            return res.status(404).json({ success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create(
         {
            fullName,
            email,
            password: hashedPassword
         }  
        );

        return res.status(200).json({ success: true, message: 'User registered successfully'})

    } catch (error) {
        console.error('Error registering user:', error);
    }
}


export const login = async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).json({ success: false, message: 'Invalid fields entered'})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ success: false, message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(404).json({ success: false, message: 'Invalid credentials'})
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:'1d'})


        return res.status(200).cookie('token', token, {httpOnly: true, sameSite: "strict", maxAge:24*60*60*1000}).json({ success: true, message: 'User logged in successfully'})

    } catch (error) {
        console.log("Error registering user:", error);
        
    }
}

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({success:true, message: "User Logout Successfully"});
    } catch (error) {
        console.log("Error registering user:", error);

    }
}