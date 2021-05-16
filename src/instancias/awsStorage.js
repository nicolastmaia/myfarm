import Storage from '@aws-amplify/storage';

export const uploadToS3 = async (data) => {
  const response = await Storage.put(Date.now(), data, {
    level: 'private',
    contentType: 'image/jpeg',
  });

  return response;
};

export const fetchManyFromS3 = async () => {
  const response = await Storage.list('', {
    level: 'private',
    cacheControl: 'no-cache',
  });

  return response;
};

export const fetchOneFromS3 = async (fileKey) => {
  const response = await Storage.get(fileKey, {
    level: 'private',
    cacheControl: 'no-cache',
  });

  return response;
};
