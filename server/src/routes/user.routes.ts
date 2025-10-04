
import { Router } from "express";
import schemaValidator, { loginValidator } from "../middlewares/validator.middleware";
import { initiateChangePassWord, createUser, login, protectedRoute, sendChangePasswordForm } from "../controller/user/user.controller";
import  UserSchema, { LoginSchema }  from "../controller/user/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";


export const userRoutes = Router()
userRoutes.post("/create", schemaValidator(UserSchema), createUser)

userRoutes.post("/login", schemaValidator(LoginSchema), login)

userRoutes.post("/protected", authMiddleware , protectedRoute)

userRoutes.post("/logout", (_req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});

userRoutes.post("/edit", authMiddleware)

userRoutes.post("/change-password", authMiddleware, loginValidator(LoginSchema))

userRoutes.post("/email", authMiddleware ,initiateChangePassWord)

userRoutes.get("/reset-password", sendChangePasswordForm)