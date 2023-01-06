import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '../../hooks/useNavigation';
import { VideoPost } from '../../types/video';
import { BottomActions, LeftActions, TopActions } from '../Actions';
import { BackIcon, Button, Text } from '../Common';
import InteractiveVideo from '../InteractiveVideo';
import SafeAreaView from '../SafeAreaView';
import DeleteVideoModal from './components/DeleteVideoModal';

export const styles = StyleSheet.create({});

export interface FullScreenVideoPostProps {
	videoPost: VideoPost | undefined;
	isActive?: boolean;
	enableDelete?: boolean;
}

export const FullScreenVideoPost: React.FC<FullScreenVideoPostProps> = ({
	videoPost,
	isActive,
	enableDelete,
}) => {
	const { goBack } = useNavigation();
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	return (
		<SafeAreaView statusBarStyle="light-content" backgroundColor="black">
			<TopActions
				left={<BackIcon size={25} color="white" onPress={goBack} />}
			/>

			<InteractiveVideo
				uri={videoPost?.videoUrl}
				autoPlay={isActive}
				loaded={isActive}
				fillContainer
			/>

			<LeftActions>
				<Text category="h5" color="white" text={videoPost?.postTitle} />
				<Text category="s1" color="white" text={videoPost?.restaurantName} />
			</LeftActions>

			<BottomActions
				right={
					enableDelete && (
						<Button
							text="Delete"
							onPress={() => setDeleteModalOpen(true)}
							style={{ backgroundColor: 'red' }}
							textStyle={{ color: 'white' }}
						/>
					)
				}
			/>

			{enableDelete && (
				<DeleteVideoModal
					videoPost={videoPost}
					open={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
				/>
			)}
		</SafeAreaView>
	);
};

export default FullScreenVideoPost;
