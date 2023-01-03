import { BottomTabBarProps as RNBottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from '@ui-kitten/components';
import { View } from 'react-native';
import { AppRouteName, AppHomeRouteName } from '../../constants/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserContext } from '../../contexts/UserContext';

const BOTTOM_TAB_ROUTES: Array<string> = [
	AppHomeRouteName.FeedScreen,
	AppRouteName.UploadScreen,
	AppHomeRouteName.MeScreen,
];

const AUTENTICATED_ROUTES_SET = new Set([
	AppRouteName.UploadScreen,
	AppHomeRouteName.MeScreen,
] as Array<string>);

export type BottomTabBarProps = Pick<
	RNBottomTabBarProps,
	'navigation' | 'state'
>;

// const mockIsAuthenticated = () => {
// 	return false;
// };

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
	navigation,
	state,
}) => {
	const { navigate } = navigation;
	const { index: routeIndex, routeNames } = state;
	const { bottom: SafeAreaBottom } = useSafeAreaInsets();
	const { cognitoUser, user } = useUserContext();

	const onSelect = useCallback(
		(index: number) => {
			const currentTab = BOTTOM_TAB_ROUTES[index];

			if (AUTENTICATED_ROUTES_SET.has(currentTab)) {
				if (!cognitoUser || !user) {
					navigate(AppRouteName.LoginScreen);
					return;
				}
			}

			navigate(currentTab);
		},
		[cognitoUser, navigate, user],
	);

	return (
		<BottomNavigation
			appearance="noIndicator"
			selectedIndex={BOTTOM_TAB_ROUTES.indexOf(routeNames[routeIndex])}
			onSelect={onSelect}
			style={{ paddingBottom: SafeAreaBottom }}
		>
			<BottomNavigationTab title="Home" />
			<BottomNavigationTab
				icon={
					<View>
						<Icon
							name="plus"
							fill="white"
							style={{
								display: 'flex',
								alignSelf: 'center',
								width: 52,
								height: 35,
								backgroundColor: '#FF5722',
								borderRadius: 10,
								overflow: 'hidden',
							}}
						/>
					</View>
				}
			/>
			<BottomNavigationTab title="Me" />
		</BottomNavigation>
	);
};
