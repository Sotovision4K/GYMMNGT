import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../controller/user/user.types";


type jwtPayload = Pick<User,  "email" | "fullName" | "role">;

interface AuthenticatedRequest extends Request {
    user?: jwtPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1] as string;
    console.log("Token received:", token);
    if (!token ) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY as string) as jwtPayload;  
        req.user = decoded;      
        next();
        return 

    }catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}