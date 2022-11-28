import React from 'react';
import { Text } from 'react-native';
import { Placeholder } from '../../components/Placeholder';
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import { AppHomeRouteName, AppRouteName } from '../../constants/navigation';

export interface UploadProps {}

export const Upload: React.FC<UploadProps> = () => {
	const { navigate } =
		useNavigation<StackNavigationProp<AppNavigatorParamList>>();

	return (
		<Placeholder>
			<Text>This is Upload Screen</Text>
			<Button
				onPress={() => {
					navigate(AppRouteName.HomeNavigator, {
						screen: AppHomeRouteName.FeedScreen,
					});
				}}
			>
				<Text>Go Back</Text>
			</Button>
		</Placeholder>
	);
};

export default Upload;
