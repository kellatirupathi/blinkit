// // src/ImageList.js
// import React, { useState, useEffect } from 'react';
// import { storage } from './firebase';
// import { DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
// import './App.css'; // Create a new CSS file for styling

// const ImageList = () => {
//   const [imageUrls, setImageUrls] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const imageRefs = await storage.ref('images').listAll();
//         const urls = await Promise.all(imageRefs.items.map((item) => item.getDownloadURL()));
//         setImageUrls(urls);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     fetchImages();
//   }, []);

//   const handleDeleteImage = async (url) => {
//     try {
//       const imageRef = storage.refFromURL(url);
//       await imageRef.delete();
//       setImageUrls((prevUrls) => prevUrls.filter((prevUrl) => prevUrl !== url));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="image-list">
//       {imageUrls.map((url, index) => (
//         <div key={index} className="image-item">
//           <img
//             src={url}
//             alt={`Uploaded ${index}`}
//             className="image-thumbnail"
//             onClick={() => window.open(url, '_blank')}
//           />
//           <div className="image-overlay">
//             <DeleteOutlined className="delete-icon" onClick={() => handleDeleteImage(url)} />
//             <ArrowRightOutlined className="arrow-icon" onClick={() => window.open(url, '_blank')} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageList;


// src/ImageList.js
import React, { useState, useEffect, useContext } from 'react';
import { storage, auth } from './firebase';
import { DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './App.css';

const ImageList = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageRefs = await storage.ref(`images/${user.email}`).listAll();
        const urls = await Promise.all(imageRefs.items.map((item) => item.getDownloadURL()));
        setImageUrls(urls);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchImages();
  }, [user.email]);

  const handleDeleteImage = async (url) => {
    try {
      const imageRef = storage.refFromURL(url);
      await imageRef.delete();
      setImageUrls((prevUrls) => prevUrls.filter((prevUrl) => prevUrl !== url));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="image-list">
      {imageUrls.map((url, index) => (
        <div key={index} className="image-item">
          <img
            src={url}
            alt={`Uploaded ${index}`}
            className="image-thumbnail"
            onClick={() => window.open(url, '_blank')}
          />
          <div className="image-overlay">
            <DeleteOutlined className="delete-icon" onClick={() => handleDeleteImage(url)} />
            <ArrowRightOutlined className="arrow-icon" onClick={() => window.open(url, '_blank')} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
