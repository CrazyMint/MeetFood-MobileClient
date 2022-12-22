import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { Button, Input, Text } from '../../components/Common';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import { AppRouteName } from '../../constants/navigation';
import { useForm } from '../../hooks/useForm';
import {
	resendConfirmationCode,
	verifyConfirmationCode,
} from '../../utils/auth';
import { useNavigation } from '../../hooks/useNavigation';
import { useUserContext } from '../../contexts/UserContext';
import { AuthLayout } from '../../components/Layout';
import { View } from 'react-native';
import { useTimer } from '../../hooks/useTimer';

export interface ConfirmSignupCodeProps
	extends NativeStackScreenProps<
		AppNavigatorParamList,
		typeof AppRouteName.ConfirmSignupCodeScreen
	> {}

export const ConfirmSignupCode: React.FC<ConfirmSignupCodeProps> = ({
	route,
}) => {
	const { email, password } = route.params;
	const {
		values: { code },
		onFormValueChange,
	} = useForm({ code: '' }, { code: 'required' });
	const { navigateToFeedScreen, navigateToLoginScreen } = useNavigation();

	const { login } = useUserContext();

	const {
		start: timerStart,
		stop: timerStop,
		clear: timerClear,
		time,
	} = useTimer({
		initialValue: 60,
		increment: -1,
		valueLimit: 0,
	});

	useEffect(() => {
		timerStart();
		return () => {
			timerStop();
		};
	}, [timerStart, timerStop]);

	const onCodeConfirm = useCallback(async () => {
		try {
			await verifyConfirmationCode(email, code);
			try {
				await login(email, password);
				navigateToFeedScreen();
			} catch (error) {
				// TODO: show error message
				navigateToLoginScreen();
			}
		} catch (error: any) {
			console.error(error?.message);
		}
	}, [
		code,
		email,
		login,
		navigateToFeedScreen,
		navigateToLoginScreen,
		password,
	]);

	const onCodeResend = useCallback(async () => {
		timerClear();
		await resendConfirmationCode(email);
		timerStart();
	}, [email, timerClear, timerStart]);

	return (
		<AuthLayout>
			<Text
				category="h5"
				text="Verify Email"
				style={{ alignSelf: 'center', marginTop: 16, marginBottom: 24 }}
			/>

			<Text
				text={`Please enter the 6-digit code sent to ${email}`}
				style={{ alignSelf: 'center', marginTop: 16, marginBottom: 24 }}
			/>

			<Input
				// label="Code"
				value={code}
				onChangeText={onFormValueChange('code')}
				keyboardType="default"
				style={{
					marginBottom: 24,
				}}
			/>

			<Button
				text="Confirm"
				variant="primary"
				onPress={onCodeConfirm}
				style={{
					marginBottom: 24,
				}}
			/>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text text="Didn't receive a code? " />
				<Text
					onPress={onCodeResend}
					disabled={time > 0}
					text={time > 0 ? String(time) : 'Resend'}
				/>
			</View>
		</AuthLayout>
	);
};

export default ConfirmSignupCode;
