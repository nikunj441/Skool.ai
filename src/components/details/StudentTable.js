import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import './css/StudentTable.css';
import QRcode from './QRcode';
import { DataContext } from "../../context/DataProvider";
import { styled } from '@mui/material';

const StyledButton = styled(Button)`
  background-color: #2196f3; /* Material blue */
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #1976d2; /* Slightly darker shade of blue on hover */
    transform: translateY(-2px); /* Move button slightly upwards on hover */
  }

  &:active {
    transform: translateY(1px); /* Push button slightly downwards when clicked */
  }

  &:disabled {
    background-color: #cccccc; /* Light grey for disabled state */
    color: #666666; /* Dark grey for disabled state */
    cursor: not-allowed;
  }
`;

const PredictButton = styled(Button)`
  background-color: #2196f3; /* Material blue */
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #1976d2; /* Slightly darker shade of blue on hover */
    transform: translateY(-2px); /* Move button slightly upwards on hover */
  }

  &:active {
    transform: translateY(1px); /* Push button slightly downwards when clicked */
  }

  &:disabled {
    background-color: #cccccc; /* Light grey for disabled state */
    color: #666666; /* Dark grey for disabled state */
    cursor: not-allowed;
  }
`;

function StudentTable({ post }) {
  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const { account } = useContext(DataContext);

  const handleGetQR = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePrediction = async () => {
  
      try {
        const response = await fetch(`https://autoupdate-sssu.onrender.com`);
      
        if (response.ok) {
          console.log()
        } else {
          throw new Error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error generating Prediction', error);
      }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`https://skool-ai-8nbf.onrender.com/getStudents?class=${post.categories}`);
        console.log(post.categories);
        if (response.ok) {
          const data = await response.json();
          console.log('mil gya');
          setStudentData(data);
        } else {
          throw new Error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchStudentData();
    }, 1000); // Repeat every second

    return () => clearInterval(intervalId);
  }, [post]);

  return (
    <div>
      <h2>Students enrolled</h2>
      <div className="button-container">
        <StyledButton
          onClick={() => handleGetQR()}
          disabled={account.username !== post.username}
        >
          Take Attendance for today
        </StyledButton>
        <PredictButton
          onClick={() => handlePrediction()}
          disabled={account.username !== post.username}
          className="predict-button"
        >
          Generate Prediction
        </PredictButton>
      </div>
      <table className='student-table'>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Last 7 days</th>
            <th>Last 30 days</th>
            <th>Attendance Today</th>
            <th>Prediction</th>
            <th>Probability Percentage</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map(student => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{ `${student.currWeekAttendance}/7`}</td>
              <td>{student.currMonthAttendance.toFixed(2)}</td>
              {  
                student.attendance && student.attendance.length > 0 && student.attendance[student.attendance.length - 1].status === 1    
                  ? <td>✅</td>
                  : <td>❌</td>
              }
              <td>{student.presentTommorrow}</td>
              <td>{student.probability}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <QRcode onClose={handleCloseModal} />}
    </div>
  );
}

export default StudentTable;
