import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AppRouteName } from '../../constants/navigation';
import { Upload } from '../../screens/Upload';
import { Signup } from '../../screens/Signup';
import { Login } from '../../screens/Login';
import { ConfirmSignupCode } from '../../screens/ConfirmSignupCode';
import { ResetPassword } from '../../screens/ResetPassword';
import { AccountProfileSetup } from '../../screens/AccountProfileSetup';
import React from 'react';
import {
	AppHomeNavigator,
	AppHomeNavigatorParamList,
} from './AppHomeNavigator';
import UpdateAccountProfile from '../../screens/UpdateAccountProfile';
import More from '../../screens/More';
import SingleVideoFeed from '../../screens/SingleVideoFeed';
import SingleVideoView from '../../screens/SingleVideoView';

export type AppNavigatorParamList = {
	[AppRouteName.HomeNavigator]: NavigatorScreenParams<AppHomeNavigatorParamList>;
	[AppRouteName.UploadScreen]: undefined;
	[AppRouteName.SignupScreen]: undefined;
	[AppRouteName.ConfirmSignupCodeScreen]: {
		email: string;
		password: string;
	};
	[AppRouteName.LoginScreen]: undefined;
	[AppRouteName.ResetPasswordScreen]: undefined;
	[AppRouteName.AccountProfileSetupScreen]: {
		email: string;
	};
	[AppRouteName.UpdateAccountProfileScreen]: undefined;
	[AppRouteName.MoreScreen]: undefined;
	[AppRouteName.SingleVideoFeedScreen]: undefined;
	[AppRouteName.SingleVideoViewScreen]: {
		videoPostId: string;
		enableDelete?: boolean;
	};
};

const { Navigator, Screen } = createStackNavigator<AppNavigatorParamList>();

export const AppNavigator: React.FC = () => {
	return (
		<Navigator
			initialRouteName={AppRouteName.HomeNavigator}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name={AppRouteName.HomeNavigator} component={AppHomeNavigator} />
			<Screen
				name={AppRouteName.UploadScreen}
				component={Upload}
				options={TransitionPresets.ModalSlideFromBottomIOS}
			/>
			<Screen name={AppRouteName.SignupScreen} component={Signup} />
			<Screen
				name={AppRouteName.ConfirmSignupCodeScreen}
				component={ConfirmSignupCode}
			/>
			<Screen
				name={AppRouteName.LoginScreen}
				component={Login}
				options={TransitionPresets.ModalSlideFromBottomIOS}
			/>
			<Screen
				name={AppRouteName.ResetPasswordScreen}
				component={ResetPassword}
			/>
			<Screen
				name={AppRouteName.AccountProfileSetupScreen}
				component={AccountProfileSetup}
			/>
			<Screen
				name={AppRouteName.UpdateAccountProfileScreen}
				component={UpdateAccountProfile}
			/>
			<Screen name={AppRouteName.MoreScreen} component={More} />
			<Screen
				name={AppRouteName.SingleVideoFeedScreen}
				component={SingleVideoFeed}
			/>
			<Screen
				name={AppRouteName.SingleVideoViewScreen}
				component={SingleVideoView}
			/>
		</Navigator>
	);
};

export default AppNavigator;
