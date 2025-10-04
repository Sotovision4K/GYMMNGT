import { Response, Request, NextFunction } from "express"
import { ZodObject, ZodError } from 'zod';

const schemaValidator = (schema : ZodObject)=>(req: Request, res : Response, next : NextFunction)=>{

    try{
        schema.parse({body : req.body})
        next()
    }catch(error ){

        if (error instanceof ZodError){
             res.status(400).send(error.issues.map(message => ({message : message, path : message.path})))
        }
        console.log(error)
        res.send("schema validator fail").status(500)
    }
}

export default schemaValidator


export const loginValidator = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({ body: req.body });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error.issues.map(issue => ({ message: issue.message, path: issue.path })));
        } else {
            console.error("Unexpected error in loginValidator:", error);
            res.status(500).send("Internal server error");
        }
    }
}