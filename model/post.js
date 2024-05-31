import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    
    picture:{
        type: String,
        required: false
    },
    username:{
        type: String
    },
    categories:{
        type: String
        
    },
    createdDate:{
        type: Date
    }
})


const post = mongoose.model('post', postSchema)

export default post 