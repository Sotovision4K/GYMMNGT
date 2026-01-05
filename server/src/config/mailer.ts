
import { readFileSync } from "fs";
import {createTransport} from "nodemailer"
import { join } from "path";
import handlerbars from "handlebars"

import dotenv from "dotenv"

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}



export const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
},
tls: {
    rejectUnauthorized: false

},
})

transporter.verify().then(() => {
    console.log("Mailer is ready to send emails");
}).catch((error) => {
    console.error("Error verifying mailer:", error);
});


export const changePasswordTemplate = (fileName: string)=> {

    try{
        const templatePath = join(process.env.EMAIL_TEMPLATE_DIR || "src/views/", fileName);
        const templateSource = readFileSync(templatePath, "utf-8");
        return handlerbars.compile(templateSource);
    }catch (error) {
        console.error("Error loading email template:", error);

        throw new Error("Failed to load email template");
    }
}