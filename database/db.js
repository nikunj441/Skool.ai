import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const Connection = async () =>{

    const URL = process.env.MONGO_URI
    try{
      await mongoose.connect(URL,{useNewUrlParser: true})
      console.log("Database connected successfully") 
    }catch(err){ 
        console.log("Error while connecting to database",err)
    }
}

export default Connection  