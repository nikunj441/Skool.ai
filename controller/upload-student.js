import multer from 'multer'; // For handling file uploads
import xlsx from 'xlsx'; // For reading Excel files
import mlStudents from '../model/ml_student.js';
const upload = multer({ dest: 'uploads/' }); // Destination folder for file uploads

// Route to handle file upload
export const uploadStudents = async (req, res) => {
    const option = req.body.option; // Get the selected option from the request body
    const file = req.file
  

    if (!req.file) {
        return res.status(400).send('No file  uploaded');
    }

    // Get the file path
    const filePath = req.file.path;

    // Read Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
  
    // Convert Excel data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Extract required columns
    const studentsData = jsonData.map(row => ({
        rollNumber: row['Roll Number'],
        name: row['Name'],
        phoneNumber: row['Phone Number'],
        class: option // Set the class as the value of the option field
    }));

    // Save data to MongoDB
    try{
        
        const options = { ordered: true };
        await mlStudents.insertMany(studentsData, options);
        // console.log('Data inserted successfully into MongoDB:', docs);
        res.status(200).send('Data inserted successfully into MongoDB');
    }
   catch (err) {
            console.error(err);
            res.status(500).send('Error saving data to MongoDB');
        } 
};

