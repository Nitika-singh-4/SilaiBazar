import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
        try {
            const actualToken = token.split(" ")[1];
            console.log("Token being verified:", actualToken);
            console.log("Secret:", process.env.JWT_SECRET);
            const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            console.log("JWT verify failed:", err.message);
            res.status(401).json({ msg: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ msg: "No token, authorization denied" });
    }
};


export default protect;
