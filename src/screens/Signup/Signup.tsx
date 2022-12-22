import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Input, SecureInput, Text } from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import { userSignup } from '../../utils/auth';
import { useNavigation } from '../../hooks/useNavigation';
import { AuthLayout } from '../../components/Layout';

export const Signup: React.FC = () => {
	const { navigateToConfirmScreen, navigateToLoginScreen } = useNavigation();

	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const {
		values: { email, password },
		errors,
		onFormValueChange,
		setFormErrors,
		handleSubmit,
	} = useForm(
		{
			email: '',
			password: '',
		},
		{
			email: 'required',
			password: [
				'required',
				(password: string) =>
					password.length < 8
						? 'Your password must be at least 8 characters'
						: null,
				(password: string) =>
					!/[A-Z]/.test(password)
						? 'Your password must contain uppercase letter'
						: null,
				(password: string) =>
					!/[a-z]/.test(password)
						? 'Your password must contain lowercase letter'
						: null,
				(password: string) =>
					!/[\d]/.test(password) ? 'Your password must contain numbers' : null,
			],
		},
	);

	const onSignup = useCallback(async () => {
		try {
			await userSignup(email, password);
			// already signed up, not navigating
			navigateToConfirmScreen(email, password);
		} catch (error: any) {
			// console.debug(error);
			setFormErrors(error);
		}
	}, [email, navigateToConfirmScreen, password, setFormErrors]);

	return (
		<AuthLayout>
			<Text
				category="h5"
				text="Sign up"
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
				caption={() =>
					!password ? (
						<Text
							category="c1"
							style={{
								color: '#7D7A77',
								marginBottom: 0,
							}}
							text="Your password must be at least 8 characters and contain uppercase letters, lowercase letters, and numbers."
						/>
					) : (
						<React.Fragment /> // This is an empty component
					)
				}
				errorMessage={errors?.password}
			/>

			<Button
				text="Continue"
				variant="primary"
				onPress={handleSubmit(onSignup)}
				style={{ marginBottom: 24 }}
			/>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text text="Already have an account?" style={{ marginRight: 4 }} />
				<Text text="Log in here" onPress={navigateToLoginScreen} />
				<Text text="." />
			</View>
		</AuthLayout>
	);
};

export default Signup;
