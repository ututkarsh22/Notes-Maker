import mongoose from "mongoose";



export const connectDb = async()=>{
    try {
        const connectionString = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database successfully connected with host id ${connectionString.connection.host}`)
    } catch (error) {
        console.log("Problem in connecting database",error);
        process.exit(1);
    }
}