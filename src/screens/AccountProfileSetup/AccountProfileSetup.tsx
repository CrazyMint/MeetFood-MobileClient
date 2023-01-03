import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserAPI from '../../apis/user-api';
import { TopActions } from '../../components/Actions';
import { BackIcon, Button, Text } from '../../components/Common';

import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import { AppRouteName } from '../../constants/navigation';
import { useUserContext } from '../../contexts/UserContext';
import { useForm } from '../../hooks/useForm';
import { useNavigation } from '../../hooks/useNavigation';
import { Grid } from '../../components/Layout';
import { Input } from '../../components/Common/Input';

export const styles = StyleSheet.create({});

export type AccountProfileSetupProps = NativeStackScreenProps<
	AppNavigatorParamList,
	typeof AppRouteName.AccountProfileSetupScreen
>;
interface FormData {
	displayName: string;
	firstName: string;
	lastName: string;
}

export const AccountProfileSetup: React.FC<AccountProfileSetupProps> = ({
	route,
}) => {
	const { email } = route.params;
	const {
		values: { displayName, firstName, lastName },
		errors,
		onFormValueChange,
		handleSubmit,
	} = useForm<FormData>(
		{
			displayName: '',
			firstName: '',
			lastName: '',
		},
		{
			displayName: 'required',
			firstName: 'required',
			lastName: 'required',
		},
	);

	const { goBack, navigateToFeedScreen } = useNavigation();
	const [isCreated, setIsCreated] = useState(false);
	const { getUserProfile } = useUserContext();

	const handleSave = useCallback(
		async ({ displayName, firstName, lastName }: FormData) => {
			try {
				if (!isCreated) {
					await UserAPI.createUser(email);
					setIsCreated(true);
				}

				await UserAPI.updateUser({
					userName: displayName,
					firstName,
					lastName,
				});

				await getUserProfile();

				navigateToFeedScreen();
			} catch (error) {
				// TODO: add a module
				console.error(error);
			}
		},
		[email, getUserProfile, isCreated, navigateToFeedScreen],
	);

	return (
		<SafeAreaView>
			<TopActions
				left={<BackIcon size={25} color="black" onPress={goBack} />}
				center={<Text color="black" text="Account Profile" />}
			/>

			<KeyboardAwareScrollView>
				<Grid
					direction="column"
					alignItems="center"
					style={{
						paddingHorizontal: 20,
						width: '100%',
					}}
				>
					<Input
						label="Display name"
						style={{ marginTop: 16, marginBottom: 24 }}
						value={displayName}
						onChangeText={onFormValueChange('displayName')}
						keyboardType="default"
						errorMessage={errors.displayName}
						enableCloseIcon
					/>

					<Grid>
						<Input
							label="First name"
							style={{
								marginBottom: 24,
								flexBasis: 0,
								flexGrow: 1,
								marginRight: 10,
							}}
							value={firstName}
							onChangeText={onFormValueChange('firstName')}
							keyboardType="default"
							errorMessage={errors.firstName}
							enableCloseIcon
						/>

						<Input
							label="Last name"
							style={{
								marginBottom: 24,
								flexBasis: 0,
								flexGrow: 1,
							}}
							value={lastName}
							onChangeText={onFormValueChange('lastName')}
							keyboardType="default"
							errorMessage={errors.lastName}
							enableCloseIcon
						/>
					</Grid>

					<Button
						text="Save"
						variant="primary"
						onPress={handleSubmit(handleSave)}
						style={{ alignSelf: 'center' }}
					/>
				</Grid>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

export default AccountProfileSetup;
