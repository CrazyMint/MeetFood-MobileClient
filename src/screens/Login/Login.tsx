import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Input, SecureInput, Text } from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import { resendConfirmationCode } from '../../utils/auth';
import {
	isUserNotConfirmedError,
	isNoUserRecordInDBError,
} from '../../utils/error';
import { useNavigation } from '../../hooks/useNavigation';
import { useUserContext } from '../../contexts/UserContext';
import { AuthLayout } from '../../components/Layout';

export const Login: React.FC = () => {
	const {
		navigateToFeedScreen,
		navigateToConfirmScreen,
		navigateToSignupScreen,
		navigateToResetPasswordScreen,
		navigateToAccountProfileSetupScreen,
	} = useNavigation();

	const { login } = useUserContext();

	const {
		values: { email, password },
		onFormValueChange,
		errors,
		setFormErrors,
		handleSubmit,
	} = useForm(
		{
			email: '',
			password: '',
		},
		{
			email: 'required',
			password: 'required',
		},
	);

	const onLogin = useCallback(async () => {
		try {
			// await userSignin(email, password);
			await login(email, password);
			navigateToFeedScreen();
		} catch (error: any) {
			if (isUserNotConfirmedError(error)) {
				await resendConfirmationCode(email).catch();
				navigateToConfirmScreen(email, password);
			} else if (isNoUserRecordInDBError(error)) {
				navigateToAccountProfileSetupScreen(email);
			}

			// console.error(error?.message);
			setFormErrors(error?.message);
		}
	}, [
		email,
		login,
		navigateToAccountProfileSetupScreen,
		navigateToConfirmScreen,
		navigateToFeedScreen,
		password,
		setFormErrors,
	]);

	return (
		<AuthLayout>
			<Text
				category="h5"
				text="Log In"
				style={{ alignSelf: 'center', marginTop: 16, marginBottom: 24 }}
			/>

			<Input
				label="Email"
				value={email}
				onChangeText={onFormValueChange('email')}
				keyboardType="email-address"
				style={{
					marginBottom: 24,
				}}
				errorMessage={errors?.email}
			/>

			<SecureInput
				label="Password"
				value={password}
				onChangeText={onFormValueChange('password')}
				keyboardType="default"
				style={{
					marginBottom: 24,
				}}
				errorMessage={errors?.password}
			/>

			<Text
				text="Forgot your password?"
				style={{ alignSelf: 'center', marginBottom: 24 }}
				onPress={navigateToResetPasswordScreen}
			/>

			<Button
				text="Log In"
				variant="primary"
				onPress={handleSubmit(onLogin)}
				style={{ marginBottom: 24 }}
			/>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text text="Don't have an account?" style={{ marginRight: 4 }} />
				<Text text="Sign up here" onPress={navigateToSignupScreen} />
				<Text text="." />
			</View>
		</AuthLayout>
	);
};

export default Login;
