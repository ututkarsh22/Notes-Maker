import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/dbConnect.js";
import cors from "cors";
import router from "./routes/notes.router.js";


dotenv.config({path : "./.env"});

const app = express();
const port = process.env.PORT || 5001;
const notesRouter = router;

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))
app.use(express.json());

app.use("/api/v1",notesRouter);


connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server running successfully on port ${port}`);
    })

    app.on("error",(error)=>{
        console.log(`Error in running server`,error);
    })
})
.catch((error)=>{
    console.log("Error in connecting Mongodb database",error);
})
