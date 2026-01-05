import { Request, Response, NextFunction } from "express";
import { GymObject } from "../controller/gym/gym";
import axios from "axios";



export const verifyCommerceID = async  (req : Request<unknown, unknown, GymObject>, res: Response, _next: NextFunction) =>{
    const { NIT, name } = req.body
    console.log(NIT, name)
    try{
        const response = await axios.get(`https://webservices.metropol.gov.co/SIMAPI/api/Terceros/GetEmpresas?Nit=${parseInt(NIT)}`)
        if (response.status=== 500){
            res.status(400).send({message : "NIT not found"})
        }
        console.error(response)
    }catch(error){
        console.error(error)
    }
   
    
    res.send("ok")
}