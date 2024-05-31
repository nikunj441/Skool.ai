import bcrypt from 'bcrypt'
import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../model/token.js'
 
dotenv.config()

export const signupUser = async (req,res) =>{
    try{

        // const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, username: req.body.username, password: hashedPassword}

        const newUser = new User(user)
        await newUser.save()
        return res.status(200).json({msg: 'Signup successful'})
    }catch(err){
        return res.status(500).json({msg: 'Error while signup the user'})
    }
    
}

export const loginUser = async (req,res) =>{

    let user = await User.findOne({username: req.body.username}).exec()

    if(!user){
        return res.status(400).json({msg: "Username doesn't matches"})
    }
    try{
        let match = await bcrypt.compare(req.body.password, user.password)
        
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY)
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({token: refreshToken})
            await newToken.save()

            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username})

        }
        else{
            return res.status(404).json({msg: 'Password does not match'})
        }
    }catch(err){
        
        return res.status(500).json({msg: 'Error while login'})
    }
    
}