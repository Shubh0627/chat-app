import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Middleware to protect routes
export const protectRoute = async (req, res, next)=>{
    try {
        // Get token from custom header 'token' or from Authorization header
        const token = req.headers['token'] || (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ') ? req.headers['authorization'].split(' ')[1] : null);

        if(!token) {
            return res.status(401).json({success: false, message: "No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) return res.status(404).json({success: false, message: "User not found"})

        req.user = user;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).json({success: false, message: error.message})
    }
}