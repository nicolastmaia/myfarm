import React, { createContext, useState } from 'react';
import { uploadToS3 } from '../instancias/awsStorage';

const ImgContext = createContext({ iamges: null, uploadImage: null });

export const ImgProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const uploadImage = async () => {
    const result = await uploadToS3();
    setImages(result);
  };

  return (
    <ImgContext.Provider value={{ images, uploadImage }}>
      {children}
    </ImgContext.Provider>
  );
};

export default ImgContext;
