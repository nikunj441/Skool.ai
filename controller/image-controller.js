import grid from 'gridfs-stream'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.BASE_URL

const conn = mongoose.connection

let gfs
let gridfsBucket;


conn.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    })
    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})



export const uploadImage = (req,res) =>{
    if(!req.file){
        return res.status(404).json({msg: 'File not found'})
    }
    
    const imageUrl = `${url}/file/${req.file.filename}`

    return res.status(200).json(imageUrl)
}
 


export const getImage = async (req,res) =>{
    
    try{
       const file = await gfs.files.findOne({filename: req.params.filename})

       if (!file) {
        return res.status(404).json({ msg: 'File not found' });
      }
      
       const readStream = await gridfsBucket.openDownloadStream(file._id)
       readStream.pipe(res)
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}
