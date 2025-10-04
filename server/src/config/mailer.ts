
import { readFileSync } from "fs";
import { createTransport } from "nodemailer";
import { join } from "path";
import handlerbars from "handlebars";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

transporter.verify().then(() => {
    console.log("Mailer is ready to send emails");
}).catch((error) => {
    console.error("Error verifying mailer:", error);
});


export const changePasswordTemplate = (fileName: string)=> {

    try{
        const templatePath = join("src/views/", fileName);
        const templateSource = readFileSync(templatePath, "utf-8");
        return handlerbars.compile(templateSource);
    }catch (error) {
        console.error("Error loading email template:", error);

        throw new Error("Failed to load email template");
    }
}