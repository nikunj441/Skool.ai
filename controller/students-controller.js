import mlStudents from '../model/ml_student.js';
import qr from 'qrcode';
import cron from 'node-cron';


export const getStudents = async (req,res) =>{
    
    try {
        const studentData = await mlStudents.find({class : req.query.class}) ;
        return res.status(200).json(studentData);
    } catch (error) { 
        return res.status(500).json({msg:error.message})
    }
}


let generatedUUID;
export const getQR = async (req, res) => {
    let uuid = generateUUID(); // Generate a unique UUID
   
    generatedUUID = uuid; // Data to embed in the QR code
    console.log('Generated QR for the following ID: ',uuid);
     
    
    qr.toDataURL(generatedUUID, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            res.status(500).send('Error generating QR code');
        } else {
            res.send(url); // Send the QR code URL back to the client
        }
    });
 };
 
 // Utility function to generate a UUID (Universally Unique Identifier)
 const generateUUID = ()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
 }


 //Marking student attendance 

export const authenticateAttendance = async (req, res) =>{
    const  appPhoneNumber = req.body.phoneNumberInfo;
    const receivedUUID = req.body.scannedData;
    console.log(`${generatedUUID} and  ${receivedUUID}`);
    try {
        const studentData = await mlStudents.findOne({ phoneNumber: appPhoneNumber });

        if (studentData && receivedUUID === generatedUUID) {
            let currentDate = new Date();   

            const day = currentDate.getDate(); // Get the day of the month (1-31)
            const month = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to get the correct month number (1-12)
            const year = currentDate.getFullYear(); // Get the full year (e.g., 2022)
            
            // Construct the date string in the format "day/month/year"
             currentDate = `${day}/${month}/${year}`;
            
            const len = studentData.attendance.length;
            const lastAttendanceEntry = studentData.attendance[len - 1];
            
           if(!lastAttendanceEntry){
            return res.json({message: 'Attendance marked for first day'});
           }
            if (lastAttendanceEntry.date === currentDate && lastAttendanceEntry.status === 0) {
                // Update the status of the last attendance entry to 1
               
                await mlStudents.findOneAndUpdate(
                    { "phoneNumber": appPhoneNumber },
                    { $set: { "attendance.$[elem].status": 1 } },
                    { arrayFilters: [{ "elem.date": currentDate }] }
                );
                
                return res.json({ message: 'Attendance marked for today.' });
            }
            else{
                return res.json({message: 'Attendance already marked for today'})
            }

        } else {
            res.status(401).json({ message: 'Invalid' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: 'Server error while marking attendance.' });
    }
};


export const validateStudent =  async (req, res) =>{
    const { rollNumber, phoneNumberInfo } = req.body;

      
        const existingStudent = await mlStudents.findOne({ rollNumber: rollNumber });
        
        if (existingStudent) {
            for (let i = 0; i < existingStudent.phoneNumber.length; i++) {
                if (existingStudent.phoneNumber[i] !== phoneNumberInfo[i]) {
                    console.log('Character mismatch at index:', i);
                    console.log('existingStudent.phoneNumber character:', existingStudent.phoneNumber[i]);
                    console.log('phoneNumberInfo character:', phoneNumberInfo[i]);
                    break; // Exit loop after first mismatch
                }
            }
          if (  existingStudent.phoneNumber === phoneNumberInfo ) {

            
            if(existingStudent.flag === 1){
                console.log('user already created')
                res.status(200).json({ message: "User created." , exists: 1});
                
            }

            else{
                console.log('create user');
                res.status(200).json({ message: "Create user.", exists: 0});
            }

          } else {
            console.log('Phonenumber did not match')
            res.status(200).json({ message: "Invalid Data" , exists: -1})
          }
        } else {
          // No student found with the provided roll number
          // Handle the case where the student doesn't exist
          console.log('No student found');
          res.status(200).json({message: "No student found", exist: -1})
        }

}

export const updateStudent = async (req, res) => {
    const rollNumberToUpdate = req.body.rollNumber;

    try {
        // Find the student with the provided roll number
        const student = await mlStudents.findOne({ rollNumber: rollNumberToUpdate });

        if (student) {
            // Update the student data
            student.phoneNumber = req.body.phoneNumberInfo;
            student.distance = req.body.distance;
            student.residence = req.body.residence;
            student.income = req.body.income;
            student.participation = req.body.participation;
            student.transport = req.body.transport;

            // Update attendance
            let currentDate = new Date();
            const day = currentDate.getDate(); 
            const month = currentDate.getMonth() + 1; 
            const year = currentDate.getFullYear(); 
            currentDate = `${day}/${month}/${year}`;

            // Check if attendance for today already exists
            const existingAttendance = student.attendance.find(entry => entry.date === currentDate);
            if (!existingAttendance) {
                student.attendance.push({ date: currentDate, status: 0 });
            }

            // Update flag
            student.flag = 1;

            // Save the updated student data
            await student.save();

            console.log('Student Updated');
            return res.status(200).json({ msg: 'Student Updated' });
        } else {
            console.log('Student not found');
            return res.status(404).json({ msg: 'Student not found' });
        }
    } catch (err) {
        console.error('Error updating student:', err);
        return res.status(500).json(err);
    }
};




// Adding new date  to the attendance list of all students
cron.schedule('0 0 * * 1-5', async () => {
    try {
       let currentDate = new Date();

        const day = currentDate.getDate(); 
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear(); 
     
        currentDate = `${day}/${month}/${year}`;
        //  Get the current date in day/month/year format
        // Update attendance.date and status for all students
        const updateResult = await mlStudents.updateMany(
            {}, 
            {
                $push: { 'attendance': { date: currentDate, status: 0 } }
            }
        );

        console.log(`Attendance date and status updated for ${updateResult.modifiedCount} students`);
    } catch (error) {
        console.error('Error updating attendance date and status:', error);
    }
});

// cron.schedule('*/120 * * * * *', async () => {
//     try {
//             let currentDate = new Date();

//             const day = currentDate.getDate(); // Get the day of the month (1-31)
//             const month = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to get the correct month number (1-12)
//             const year = currentDate.getFullYear(); // Get the full year (e.g., 2022)
            
//             // Construct the date string in the format "day/month/year"
//              currentDate = `${day}/${month}/${year}`;
//              // Get the current date in day/month/year format

//         // Update attendance.date and status for all students
//         const updateResult = await mlStudents.updateMany(
//             {},
//             {
//                 $push: { 'attendance': { date: currentDate, status: 0 } }
//             }
//         );

//         // console.log(`Attendance date and status updated for ${updateResult.modifiedCount} students`);
//     } catch (error) {
//         console.error('Error updating attendance date and status:', error);
//     }
// });