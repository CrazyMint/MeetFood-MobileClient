import { Button } from '../../Common';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useUserContext } from '../../../contexts/UserContext';
import { useNavigation } from '../../../hooks/useNavigation';
import { VideoPost } from '../../../types/video';
import { Modal, Text } from '../../Common';
import { Grid } from '../../Layout';
import videoApi from '../../../apis/video-api';

export const styles = StyleSheet.create({
	modalContainer: {
		padding: 24,
	},
	modalContentTitle: {
		alignSelf: 'flex-start',
		marginBottom: 16,
	},
	modalContentText: {
		alignSelf: 'flex-start',
		marginBottom: 24,
		color: '#7D7A77',
	},
	cancelButton: {
		marginRight: 16,
	},
	confirmButton: {
		backgroundColor: '#EC1313',
	},
});

export interface DeleteVideoModalProps {
	videoPost: VideoPost | undefined;
	open: boolean;
	onClose: () => void;
}

export const DeleteVideoModal: React.FC<DeleteVideoModalProps> = ({
	videoPost,
	open,
	onClose,
}) => {
	const { goBack } = useNavigation();
	const { getUserProfile } = useUserContext();

	return (
		<Modal open={open} onClose={onClose}>
			<Grid
				style={styles.modalContainer}
				direction="column"
				alignItems="center"
				justifyContent="center"
			>
				<Text
					category="h6"
					style={styles.modalContentTitle}
					text="Are you sure to delete this video?"
				/>
				<Text
					category="p1"
					style={styles.modalContentText}
					text="Your video will be permanently deleted"
				/>

				<Grid>
					<Button text="Cancel" style={styles.cancelButton} onPress={onClose} />
					<Button
						text="Delete"
						style={styles.confirmButton}
						onPress={async () => {
							if (videoPost?._id) {
								try {
									await videoApi.deleteVideo(videoPost._id);
								} catch (error) {
									// TODO: add a modal to show the error msg
									onClose();
									return;
								}

								try {
									await getUserProfile();
								} catch (error) {
									// TODO: add a modal to show the error msg
								} finally {
									onClose();

									// Go back to me screen
									goBack();
								}
							}
						}}
					/>
				</Grid>
			</Grid>
		</Modal>
	);
};

export default DeleteVideoModal;
