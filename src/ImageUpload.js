// src/ImageUpload.js
import React, { useState, useContext } from 'react';
import { storage, auth } from './firebase';
import './App.css';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const user = auth.currentUser;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setErrorMessage(''); // Clear error message when a file is selected
    }
  };

  const handleUpload = () => {
    if (!image) {
      setErrorMessage('Please select an image before uploading.');
      return;
    }

    const uploadTask = storage.ref(`images/${user.email}/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error(error.message);
        setErrorMessage('Upload failed. Please try again.');
        setIsUploadComplete(false);
      },
      () => {
        storage.ref(`images/${user.email}`).child(image.name).getDownloadURL().then((url) => {
          console.log('File available at', url);
          setIsUploadComplete(true);
          setProgress(0); // Reset progress once upload is complete
        });
      }
    );
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} style={{ width: '50%' }}>Upload</button>
      {progress > 0 && progress < 100 && <progress value={progress} max="100" />}
      {isUploadComplete && <p style={{ color: 'green' }}>Upload complete!</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ImageUpload;
