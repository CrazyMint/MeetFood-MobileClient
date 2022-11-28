import React from 'react';
import { AppHomeRouteName } from '../../constants/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feed } from '../../screens/Feed';
import { Me } from '../../screens/Me';
import { BottomTabBar } from './BottomTabBar';

export type AppHomeNavigatorParamList = {
	[AppHomeRouteName.FeedScreen]: undefined;
	[AppHomeRouteName.MeScreen]: undefined;
};

const { Navigator, Screen } =
	createBottomTabNavigator<AppHomeNavigatorParamList>();

export const AppHomeNavigator: React.FC = () => {
	return (
		<Navigator
			initialRouteName={AppHomeRouteName.FeedScreen}
			screenOptions={{
				headerShown: false,
			}}
			tabBar={(props) => <BottomTabBar {...props} />}
		>
			<Screen name={AppHomeRouteName.FeedScreen} component={Feed} />
			<Screen name={AppHomeRouteName.MeScreen} component={Me} />
		</Navigator>
	);
};
