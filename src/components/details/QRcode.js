// eslint-disable-next-line
import React,{useState, useEffect} from 'react'

import './css/modal.css'


const QRcode = ({ onClose }) => {
  const [qrCodeURL, setQRCodeURL] = useState('');
  
// Track whether QR code has been scanned
 

const fetchQRCode = async () => {
  try {
    const response = await fetch(`https://skool-ai-8nbf.onrender.com/getQR`);
    const url = await response.text(); // Get response as text
    setQRCodeURL(url);
  } catch (error) {
    console.error('Error fetching QR code URL:', error);
  }
};

// Call fetchQRCode once immediately when component mounts
useEffect(() => {
  
  // Set interval to fetch QR code every 9 seconds
  fetchQRCode();
  const intervalId = setInterval(fetchQRCode, 9000);

  // Cleanup function to clear the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);
  
 
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Scan the QR code for marking attendance</h2>
        {/* Add QR code rendering logic here */}
        <div className="App">
      {qrCodeURL ? (
        <div className="qr-code-container">
        <img className="qr-code-image" src={qrCodeURL} alt="QR Code" />
        
        </div>
      ) : (
        <div>
          <h2>Wait for QR code</h2>
        </div>
      )}
    </div>
      </div>
    </div>
  );


}

export default QRcode
