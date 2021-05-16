import React, { createContext, useEffect, useState } from 'react';
import {
  uploadToS3,
  fetchOneFromS3,
  fetchManyFromS3,
} from '../instancias/awsStorage';

const ImgContext = createContext({
  images: null,
  uploadImage: null,
  fetchImages: null,
});

export const ImgProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const uploadImage = async (data) => {
    try {
      const response = await uploadToS3(data);
      setImages((prevState) => [...prevState, response]);
    } catch (error) {
      alert(
        'Erro ao salvar imagem. Tente novamente ou contacte nosso suporte.'
      );
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetchManyFromS3();
      setImages(response);
    } catch (error) {
      alert(
        'Erro ao recuperar imagens. Tente novamente ou contacte nosso suporte.'
      );
    }
  };

  const fetchImage = async (fileKey) => {
    try {
      const response = await fetchOneFromS3(fileKey);
      setImages((prevState) => [...prevState, response]);
    } catch (error) {
      alert(
        'Erro ao recuperar imagem. Tente novamente ou contacte nosso suporte.'
      );
    }
  };

  return (
    <ImgContext.Provider value={{ images, uploadImage, fetchImages }}>
      {children}
    </ImgContext.Provider>
  );
};

export default ImgContext;
