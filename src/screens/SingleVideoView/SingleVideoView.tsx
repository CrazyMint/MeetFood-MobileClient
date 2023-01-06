import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import FullScreenVideoPost from '../../components/FullScreenVideoPost/FullScreenVideoPost';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import { AppRouteName } from '../../constants/navigation';
import { useUserContext } from '../../contexts/UserContext';

export const styles = StyleSheet.create({});

export interface SingleVideoViewProps
	extends NativeStackScreenProps<
		AppNavigatorParamList,
		typeof AppRouteName.SingleVideoViewScreen
	> {}

export const SingleVideoView: React.FC<SingleVideoViewProps> = ({ route }) => {
	const { videoPostId, enableDelete } = route.params;
	const { user } = useUserContext();

	return (
		<FullScreenVideoPost
			videoPost={
				user!.videos.find((video) => video.videoPost._id === videoPostId)
					?.videoPost
			}
			isActive
			enableDelete={enableDelete}
		/>
	);
};

export default SingleVideoView;
