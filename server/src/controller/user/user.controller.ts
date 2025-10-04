
import {  User } from "./user.types"
import { Response, Request } from "express"
import { Roles } from "../../entities/roles.entities"

import { UserInfo } from "../../entities/user.entities"
import { LoginSchemaType } from "./user.schema"
import bcryot from "bcrypt"

import jwt from "jsonwebtoken"
import { changePasswordTemplate, transporter } from "../../config/mailer"



export const createUser = async (req : Request<unknown, unknown, User>, res : Response)=>{

    try{

        const {fullName, password, email, role, govId} = req.body
        const roleFound = await Roles.findOneBy({roleName : role})
    
        if(!roleFound){
             res.status(400).send("Role not found")
             return 
        }
        const today = new Date()
    
        const user = new UserInfo()  
    
        user.createdAt = today
        user.email = email
        user.fullName = fullName
        user.password = password
        user.role = roleFound
        user.govId = govId
    
        const userExists = await UserInfo.findOneBy({govId})
    
    
        if(userExists){
            res.status(400).send("User already exists")
            return
        }
    
        const emailExists = await UserInfo.findOneBy({email})
    
        if(emailExists){
            res.status(400).send("Email already exists")
            return
        }
    
        await user.save()
        res.status(201).json({
            message: "User created successfully",
            user: {
                fullName: user.fullName,
                email: user.email,
                role: user.role.roleName,
                createdAt: user.createdAt,
                govId: user.govId
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }


    
}

export const login = async (req : Request<unknown, unknown, LoginSchemaType>, res : Response) =>{
    const {email, password} = req.body
    const user = await  UserInfo.findOne({where : {email}, relations: ["role"]})

    if (!user) {
        res.status(401).json({message : "username does not exist", user : null})
        throw new Error("username does not exist")
    }
    const isValid = await bcryot.compare(password, user.password)
    if (isValid){
        const token = jwt.sign( user.toPublicInfo() ,process.env.SECRET_JWT_KEY as string, {
            expiresIn: "1h"
        })
        res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.ENV_PROD === "true", // Use secure cookies in production
            sameSite: "strict", 
            maxAge: 3600000 // 1 hour
        })
        .status(200)
        .json({
            message: "Login successful",
        })
    }
}


export const protectedRoute = async ( _res: Response) => {

    
};

export const sendEmailTest = async () =>{
    try {
        await transporter.sendMail({
            from: "Gym App ",
            to: "sotovisionhdmi@gmail.com",
            subject: "Test Email",
            text: "This is a test email from Gym App",
            html: "<b>This is a test email from Gym App</b>"
    })

    }catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}


export const logout = (_req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

export const editUser = async (req: Request<unknown, unknown, {user : User}>, res: Response) => {

    const { fullName, email,  role, govId } = req.body.user;

    const user = await UserInfo.findOneBy({ govId });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (fullName !== user.fullName) user.fullName = fullName;
    if (email !== user.email) user.email = email;
    if (role !== user.role.roleName) {
        const roleFound = await Roles.findOneBy({ roleName: role });
        if (!roleFound) {
            return res.status(400).json({ message: "Role not found" });
        }
        user.role = roleFound;
    }
    if (govId !== user.govId) user.govId = govId;



    await user.save();
    return res.status(200).json({
        message: "User updated successfully"})
}

export const verifyPasswordBeforeChange = async (req: Request<unknown, unknown, { currentPassword: string, user: User }>, res: Response) => {
    const {user,  currentPassword } = req.body;

    const userFound = await UserInfo.findOneBy({ govId: user.govId });

    if (!userFound) {
        return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcryot.compare(currentPassword, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Current password is incorrect" });
    }
    return res.status(201).json({ message: "Current password is correct" });

}

export const initiateChangePassWord = async (req: Request<unknown, unknown, User>, res: Response) => {
    const { govId } = req.body;

    const userFound = await UserInfo.findOneBy({ govId: govId });
    if (!userFound) {
        return res.status(404).json({ message: "User not found" });
    }

    const template = changePasswordTemplate("changingPassword.html");

    const html = template({
        name: userFound.fullName,
        companyName: "this company name",
        expiryMinutes: "60",
        resetLink: "elpunto.com",
        supportEmail: "elpuntocom@gmail.com",
        CURRENT_YEAR : new Date().getFullYear().toLocaleString(),
        requestedAt: new Date().toLocaleString()
    });

    try {
        await transporter.sendMail({
            from: "Gym App ",
            to: "sotovisionhdmi@gmail.com",
            subject: "Test Email",
            text: "This is a test email from Gym App",
            html: html
    })
    return res.send("Email sent successfully").status(200);
    }catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }


    // const isValid = await bcryot.compare(oldPassword, userFound.password);
    // if (!isValid) {
    //     return res.status(401).json({ message: "Old password is incorrect" });
    // }

    // try{
    //     const hashedPassword = await bcryot.hash(newPassword, parseInt(process.env.SALT_ROUNDS as string));
    //     userFound.password = hashedPassword;

    //     await userFound.save();
    //     return res.status(200).json({ message: "Password changed successfully" });
    // }catch (error) {
    //     console.error("Error changing password:", error);
    //     return res.status(500).json({ message: "Internal server error" });
    // }
}

export const sendChangePasswordForm = async (_req: Request, res: Response) => {
    const template = changePasswordTemplate("reset-password.html");
    const html = template({

    });
    res.send(html);
}
