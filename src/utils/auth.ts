import { Auth } from '@aws-amplify/auth';

export const userSignup = (email: string, password: string) =>
	Auth.signUp({
		username: email,
		password,
		attributes: { email },
	});

export const userSignin = (email: string, password: string) =>
	Auth.signIn(email, password);

export const userSignout = () => Auth.signOut();

export const resendConfirmationCode = (email: string) =>
	Auth.resendSignUp(email);

export const verifyConfirmationCode = (email: string, code: string) =>
	Auth.confirmSignUp(email, code);

export const forgetPassword = (email: string) => Auth.forgotPassword(email);

export const forgetPasswordSubmit = (
	email: string,
	code: string,
	newPassword: string,
) => Auth.forgotPasswordSubmit(email, code, newPassword);

export const getAuthToken = async () =>
	(await Auth.currentSession()).getAccessToken().getJwtToken();
