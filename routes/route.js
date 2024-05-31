import express from 'express'
import {signupUser, loginUser} from '../controller/user-controller.js'
import { uploadImage, getImage } from '../controller/image-controller.js'
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js'
import upload  from '../utils/upload.js'
import {authenticateToken} from "../controller/jwt-controller.js"
import { getStudents, getQR, authenticateAttendance ,validateStudent, updateStudent} from '../controller/students-controller.js'
import { uploadStudents } from '../controller/upload-student.js'

import uploadFile from '../utils/multer-config.js'
const router = express.Router()

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/file/upload', upload.single("file"), uploadImage)
router.get('/file/:filename', getImage)
router.post('/create', authenticateToken, createPost)
router.get('/posts', authenticateToken, getAllPosts)
router.get('/post/:id', authenticateToken, getPost)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)


router.get('/getStudents', getStudents)
router.get('/getQR', getQR)
router.post('/authenticateAttendance', authenticateAttendance )
router.post('/validateStudent', validateStudent)
router.post('/addStudent', updateStudent)
router.post('/upload', uploadFile.single('file'),uploadStudents) 
// router.post('/uploadStudents', uploadStudent)




export default router
