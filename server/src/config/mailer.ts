
import { readFileSync } from "fs";
import {createTransport} from "nodemailer"
import { join } from "path";
import handlerbars from "handlebars"


export const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "sotomayor.oscar1408@gmail.com",
        pass: "rjcn furi nkpk gaqp "
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
        const templatePath = join("src/views/", fileName);
        const templateSource = readFileSync(templatePath, "utf-8");
        return handlerbars.compile(templateSource);
    }catch (error) {
        console.error("Error loading email template:", error);

        throw new Error("Failed to load email template");
    }
}