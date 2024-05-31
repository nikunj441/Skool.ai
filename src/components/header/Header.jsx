import React, { useState } from 'react';
import { AppBar, Toolbar, styled, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert as MuiAlert } from '@mui/material';
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #4169E1;
    color: #CCC5B9;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    width: 40%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-around;
    display: flex;
    & > a, & > button {
        padding: 20px;
        color: white;
        font-family: 'Poppins', sans-serif;
        text-decoration: none;
        border: none;
        background: transparent;
        cursor: pointer;
        outline: none;
    }
`;

const UploadButton = styled(Button)`
    color: white;
    margin-left: 40px;
    font-weight: 700;
`;

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUploadOptionClick = (option) => {
        setSelectedOption(option);

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.xlsx';

        input.onchange = (event) => {
            const file = event.target.files[0];

            if (file && file.name.endsWith('.xlsx')) {
                setSelectedFile(file);
                setConfirmationOpen(true);
            } else {
                alert('Please upload an .xlsx file.');
            }
        };

        input.click();
    };

    const handleUploadConfirm = async () => {
        if (!selectedFile || !selectedOption) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('option', selectedOption);

        try {
            const response = await fetch('https://skoolai-server.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        console.log('Setting snackbarOpen to true');
            // Show the snackbar
            setSnackbarOpen(true);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }

        
        setConfirmationOpen(false);
        handleClose();
       
    };

    const handleDialogClose = () => {
        setConfirmationOpen(false);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Component>
            <Container>
                <Link className="navLinks" to='/'>Home</Link>
                <Link className="navLinks" to='/about'>About</Link>
                <Link className="navLinks" to='/contact'>Contact</Link>
                <Link className="navLinks" to='/login'>Logout</Link>

                <UploadButton
                    aria-controls="upload-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    Upload File
                </UploadButton>
                <Menu
                    id="upload-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {['1stYear1stSem', '1stYear2ndSem', '2ndYear1stSem', '2ndYear2ndSem', '3rdYear1stSem', '3rdYear2ndSem', '4thYear1stSem', '4thYear2ndSem'].map((option) => (
                        <MenuItem key={option} onClick={() => handleUploadOptionClick(option)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>

                <Dialog
                    open={confirmationOpen}
                    onClose={handleDialogClose}
                >
                    <DialogTitle>Confirm Upload</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Do you want to upload the file "{selectedFile && selectedFile.name}" to "{selectedOption}"?

                        </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleUploadConfirm} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        File uploaded successfully!
                    </MuiAlert>
                </Snackbar>
            </Container>
        </Component>
    );
};

export default Header;
