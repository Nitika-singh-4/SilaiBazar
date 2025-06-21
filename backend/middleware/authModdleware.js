import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) =>{
    let token = req. headers.authorization;
    if(token && token.startsWith("Bearer")){
        try{
            const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401).json({msg: "Not authorized, token failed"});
        }
    } else {
        res.status(401).json({msg: "No token, authorization denied"});
    }
}

export default protect;
