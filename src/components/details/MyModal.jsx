import React, { useState, useEffect} from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import './css/modal.css'; // Import the CSS file
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {API} from '../../service/api'
import { useNavigate } from 'react-router-dom';
const ModalHeader = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledCloseIcon = styled(CloseRoundedIcon)`
    color: blue;
    font-size: 1.5rem;
    cursor: pointer;
    
`
const MyModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNumber: '',
    phoneNumber: '',
    email: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to an API or log it
    console.log(formData);
  };

  const saveStudent = async () => {
    closeModal()
    try {
      let res = await API.addStudent(formData);
      if (res.isSuccess) {
         navigate('/');
      }
    } catch (error) {
      console.error('Error in adding student:', error);
    }
  };
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <>
    
    <div className="modal-container">
    <ModalHeader>
        <h2 style={{marginTop: 0}}>Student Information Form</h2>
        <StyledCloseIcon onClick={closeModal} />
    </ModalHeader>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button className='modal-btn' onClick={()=>saveStudent()}  type="submit">
          Add
        </button>
      </form>
    </div>
    </>
  );
};

export default MyModal;
