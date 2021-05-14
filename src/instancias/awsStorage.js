import Storage from '@aws-amplify/storage';

export const uploadToS3 = async () => {
  try {
    const result = await Storage.put('test.txt', 'Private Content', {
      level: 'private',
      contentType: 'text/plain',
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
