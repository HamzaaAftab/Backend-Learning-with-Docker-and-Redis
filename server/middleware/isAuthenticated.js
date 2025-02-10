import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Ensure `req.cookies` exists

        if (!token) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY); // No need for `await` since `jwt.verify` is synchronous

        req.id = decode.userId;
        next();
    } catch (error) {
        console.error("JWT Authentication Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" }); // Handle error properly
    }
};

export default isAuthenticated;
