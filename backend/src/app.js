import express from "express";
import { envObject } from "./config/enviroment.js";
import { ConnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";


//routes imports
import { productsRouter } from "./routes/productsRouter.js"; 
import { categoriesRouter } from "./routes/categoriesRouter.js";

//app set
const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({origin:envObject.frontend.link, credentials: true}))
app.use(cookieParser())
app.use(morgan("dev"))


//DB connect
ConnectDB();


//app routes
app.use("/api/products", productsRouter)
app.use("/api/categories", categoriesRouter); //

//server run
const PORT = envObject.server.port
app.listen(PORT, ()=>{
    console.log(`El servidor funciona en el puerto: ${PORT}`)
}) 