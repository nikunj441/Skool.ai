import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
    rollNumber:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    distance:{
        type: Number,
        default: ''
    },
    transport:{
        type: String,
        default: ''
    },
    residence:{
        type: String,
        default: ''
    },
    income:{
        type: Number,
        default: ''
    },
    participation:{
        type: Number,
        default: -1
       
    },
    
    currWeekAttendance:{
        type: Number,  // 1 - 5
        default:0
    },
    currMonthAttendance :{
        type: Number, // 0 - 1
        default: 0
    },
    class:{
        type: String
    },
    attendance:[{
        date: {
            type: String
             
        },
        status: {
            type: Number
            
        }
    }],
    presentTommorrow: {
        type: Number,
        default: 0
    },
    flag:{
        type: Number,
        default: 0
    }
})

const mlStudents = mongoose.model('mlstudent', studentSchema)

export default mlStudents