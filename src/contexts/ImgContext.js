import React, { createContext, useEffect, useState } from 'react';
import {
  uploadToS3,
  fetchOneFromS3,
  fetchManyFromS3,
  removeOneFromS3,
} from '../instancias/awsStorage';

const ImgContext = createContext({
  images: null,
  uploadImage: null,
  fetchImages: null,
  removeImage: null,
});

export const ImgProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [outDated, setOutDated] = useState(true);

  const uploadImage = async (data) => {
    try {
      await uploadToS3(data);
      setOutDated(true);
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

  const removeImage = async (fileKey) => {
    try {
      const response = await removeOneFromS3(fileKey);
      console.log(response);
      setOutDated(true);
    } catch (error) {
      alert(
        'Erro ao recuperar imagem. Tente novamente ou contacte nosso suporte.'
      );
    }
  };

  const updateImages = async () => {
    await fetchImages();
    setOutDated(false);
  };

  useEffect(() => {
    if (outDated) updateImages();
  }, [outDated]);

  return (
    <ImgContext.Provider
      value={{ images, uploadImage, fetchImages, removeImage }}
    >
      {children}
    </ImgContext.Provider>
  );
};

export default ImgContext;
