import express from "express"
import dotenv from "dotenv"
import {userRoutes} from "./routes/user.routes"
import "reflect-metadata"
import { AppDataSource } from "./db"

import cookieparser from "cookie-parser"
import { gymRoutes } from "./routes/gym.routes"


dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieparser())

async function main() {
    try {

        await AppDataSource.initialize()
        app.listen(process.env.DEV_PORT, ()=>{
        console.log('oli')
})
    }catch(error){
        console.log(error)
    }

}

main()

app.get("/ping", (_req, res)=>{
    console.log("oli")
    res.send("pong")
})


app.use(userRoutes)

app.use(gymRoutes)



