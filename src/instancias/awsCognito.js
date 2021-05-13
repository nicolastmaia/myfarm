import { Auth } from 'aws-amplify';

export const signUpWithCognito = async (username, password, otherData) => {
  const { user } = await Auth.signUp({
    username,
    password,
    attributes: { email: otherData.email, phone_number: otherData.telefone },
  });
  return user;
};

export const signInWithCognito = async (username, password) => {
  const user = await Auth.signIn(username, password);
  return user;
};

export const confirmEmailWithCognito = async (username, code) => {
  await Auth.confirmSignUp(username, code);
};
