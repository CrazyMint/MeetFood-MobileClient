import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	BackIcon,
	Button,
	Input,
	SecureInput,
	Text,
} from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import { resendConfirmationCode, userSignin } from '../../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { AppHomeRouteName, AppRouteName } from '../../constants/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import { isUerNotConfirmedError } from '../../utils/error';

export const Login: React.FC = () => {
	const { goBack, navigate } =
		useNavigation<StackNavigationProp<AppNavigatorParamList>>();

	const {
		values: { email, password },
		onFormValueChange,
	} = useForm({
		email: '',
		password: '',
	});

	const onLogin = useCallback(async () => {
		try {
			await userSignin(email, password);
			navigate(AppRouteName.HomeNavigator, {
				screen: AppHomeRouteName.FeedScreen,
			});
		} catch (error: any) {
			if (isUerNotConfirmedError(error)) {
				await resendConfirmationCode(email).catch();
				navigate(AppRouteName.ConfirmSignupCodeScreen, { email, password });
			}

			console.error(error?.message);
		}
	}, [email, navigate, password]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					height: 44,
					padding: 10,
				}}
			>
				<BackIcon size={25} color="#0F0E0E" onPress={goBack} />
			</View>

			<View style={{ flex: 1, paddingHorizontal: 16 }}>
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
				/>

				<SecureInput
					label="Password"
					value={password}
					onChangeText={onFormValueChange('password')}
					keyboardType="default"
					style={{
						marginBottom: 24,
					}}
				/>

				<Button
					text="Log In"
					variant="primary"
					onPress={onLogin}
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
					<Text
						text="Sign up here"
						onPress={() => navigate(AppRouteName.SignupScreen)}
					/>
					<Text text="." />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Login;
