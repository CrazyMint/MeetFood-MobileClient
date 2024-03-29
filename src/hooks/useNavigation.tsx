import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';
import { AppNavigatorParamList } from '../components/Navigation/AppNavigator';
import { AppHomeRouteName, AppRouteName } from '../constants/navigation';
import { useUserContext } from '../contexts/UserContext';

export const useNavigation = () => {
	const { cognitoUser, user } = useUserContext();

	const { goBack, navigate } =
		useRNNavigation<StackNavigationProp<AppNavigatorParamList>>();

	const navigateToFeedScreen = useCallback(() => {
		navigate(AppRouteName.HomeNavigator, {
			screen: AppHomeRouteName.FeedScreen,
		});
	}, [navigate]);

	const navigateToLoginScreen = useCallback(() => {
		navigate(AppRouteName.LoginScreen);
	}, [navigate]);

	const navigateToConfirmScreen = useCallback(
		(email: string, password: string) => {
			navigate(AppRouteName.ConfirmSignupCodeScreen, {
				email,
				password,
			});
		},
		[navigate],
	);

	const navigateToSignupScreen = useCallback(() => {
		navigate(AppRouteName.SignupScreen);
	}, [navigate]);

	const navigateToResetPasswordScreen = useCallback(() => {
		navigate(AppRouteName.ResetPasswordScreen);
	}, [navigate]);

	const navigateToAccountProfileSetupScreen = useCallback(
		(email: string) => {
			navigate(AppRouteName.AccountProfileSetupScreen, {
				email,
			});
		},
		[navigate],
	);

	const navigateToUpdateAccountProfileScreen = useCallback(() => {
		navigate(AppRouteName.UpdateAccountProfileScreen);
	}, [navigate]);

	const navigateToMoreScreen = useCallback(() => {
		navigate(AppRouteName.MoreScreen);
	}, [navigate]);

	const navigateToSingleVideoFeedScreen = useCallback(() => {
		navigate(AppRouteName.SingleVideoFeedScreen);
	}, [navigate]);

	const navigateToSingleVideoViewScreen = useCallback(
		(videoPostId: string, enableDelete: boolean = false) => {
			navigate(AppRouteName.SingleVideoViewScreen, {
				videoPostId,
				enableDelete,
			});
		},
		[navigate],
	);

	const navigateToEditVideoPostScreen = useCallback(
		(videoPath: string, coverImagePath?: string) => {
			if (!cognitoUser || !user) {
				navigateToLoginScreen();
			} else {
				navigate(AppRouteName.EditVideoPostScreen, {
					videoPath,
					coverImagePath,
				});
			}
		},
		[cognitoUser, navigate, navigateToLoginScreen, user],
	);

	return {
		goBack,
		navigate,
		navigateToFeedScreen,
		navigateToLoginScreen,
		navigateToConfirmScreen,
		navigateToSignupScreen,
		navigateToResetPasswordScreen,
		navigateToAccountProfileSetupScreen,
		navigateToUpdateAccountProfileScreen,
		navigateToMoreScreen,
		navigateToSingleVideoFeedScreen,
		navigateToSingleVideoViewScreen,
		navigateToEditVideoPostScreen,
	};
};
