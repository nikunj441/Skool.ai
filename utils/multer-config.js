import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/', // Destination folder for uploaded files
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    }
});

const uploadFile = multer({ storage: storage });

export default uploadFile;