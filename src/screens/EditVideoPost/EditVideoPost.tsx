import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, TextInput } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import videoApi from '../../apis/video-api';
import { TopActions } from '../../components/Actions';
import CameraView from '../../components/CameraView';
import { BackIcon, Button, Image, Input, Text } from '../../components/Common';
import { Grid } from '../../components/Layout';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import SafeAreaView from '../../components/SafeAreaView';
import { AppRouteName } from '../../constants/navigation';
import { useModalContext } from '../../contexts/ModalContext';
import { useForm } from '../../hooks/useForm';
import { useNavigation } from '../../hooks/useNavigation';
import { useUpload } from '../../hooks/useUpload';

export const styles = StyleSheet.create({
	videoInfoSectionRgithSection: {
		marginLeft: 12,
		padding: 16,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
	},
	videoInfoSectionRgithSectionErrorState: {
		borderColor: 'red',
	},
});

interface FormData {
	videoName: string;
	restaurantName: string;
}

export type EditVideoPostProps = NativeStackScreenProps<
	AppNavigatorParamList,
	typeof AppRouteName.EditVideoPostScreen
>;

export const EditVideoPost: React.FC<EditVideoPostProps> = ({ route }) => {
	const { videoPath, coverImagePath } = route.params;
	const { navigateToFeedScreen, goBack } = useNavigation();
	const { openModal } = useModalContext();
	const [showCamera, setShowCamera] = useState(false);
	const [imagePath, setImagePath] = useState<string>(coverImagePath ?? '');
	const {
		values: { videoName, restaurantName },
		errors,
		handleSubmit,
		onFormValueChange,
	} = useForm<FormData>(
		{
			videoName: '',
			restaurantName: '',
		},
		{
			videoName: 'required',
			restaurantName: 'required',
		},
	);

	useEffect(() => {
		if (!imagePath && videoPath) {
			createThumbnail({
				url: videoPath,
			})
				.then(({ path }) => {
					setImagePath(path);
				})
				.catch((error) => {
					openModal({
						title: 'Error',
						message: error?.message || 'Failed to create thumbnail',
					});
				});
		}
	}, [imagePath, openModal, videoPath]);

	const { response: videoUploadResponse, error: videoUploadError } = useUpload(
		(filePath) => videoApi.uploadVideo(filePath),
		videoPath,
	);

	const { response: imageUploadResponse, error: imageUploadError } = useUpload(
		(filePath) => videoApi.uploadCoverImage(filePath),
		imagePath,
	);

	useEffect(() => {
		if (videoUploadError) {
			openModal({
				title: 'Error',
				message: videoUploadError?.message || 'Failed to upload video',
			});
		}
		if (imageUploadError) {
			openModal({
				title: 'Error',
				message: imageUploadError?.message || 'Failed to upload cover image',
			});
		}
	}, [imageUploadError, openModal, videoUploadError]);

	const onPublish = useCallback(
		async ({ videoName, restaurantName }: FormData) => {
			try {
				await videoApi.createVideoPost({
					videoName,
					restaurantName,
					imageUrl: imageUploadResponse!.imageUrl,
					videoUrl: videoUploadResponse!.videoUrl,
				});

				navigateToFeedScreen();
			} catch (error: any) {
				openModal({
					title: 'Error',
					message: error?.message || 'Failed to publish the post',
				});
			}
		},
		[imageUploadResponse, navigateToFeedScreen, openModal, videoUploadResponse],
	);

	return (
		<SafeAreaView
			statusBarStyle={showCamera ? 'light-content' : 'dark-content'}
			backgroundColor={showCamera ? 'black' : '#F6F6F6'}
			style={{ paddingHorizontal: 8 }}
		>
			{showCamera ? (
				<CameraView
					type="photo"
					onCancel={() => setShowCamera(false)}
					onDone={(path) => {
						setImagePath(path);
						setShowCamera(false);
					}}
				/>
			) : (
				<>
					<TopActions
						left={<BackIcon size={25} color="#0F0E0E" onPress={goBack} />}
						center={<Text text="New Post" />}
					/>

					{(!videoUploadResponse?.videoUrl ||
						!imageUploadResponse?.imageUrl) && (
						<Grid
							style={{
								paddingHorizontal: 16,
								marginHorizontal: -8,
								backgroundColor: '#F6671E',
							}}
						>
							<ActivityIndicator size="small" color="white" />
							<Text
								style={{
									paddingHorizontal: 16,
									paddingVertical: 8,
									color: 'white',
								}}
								text="Uploading... Please do not leave this page or lock your screen.
								You can still fill out your post information white waiting"
							/>
						</Grid>
					)}

					<Grid
						backgroundColor="white"
						style={{ marginVertical: 20, borderRadius: 8 }}
					>
						<View>
							{imagePath && (
								<Image
									source={{ uri: imagePath }}
									width={120}
									autoResizing
									style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }}
								/>
							)}

							<Button
								text="Edit cover"
								onPress={() => setShowCamera(true)}
								style={{
									backgroundColor: 'black',
									borderTopLeftRadius: 0,
									borderTopRightRadius: 0,
									borderBottomLeftRadius: 8,
									borderBottomRightRadius: 8,
								}}
							/>
						</View>

						<Grid
							flexGrow={1}
							flexBasis={0}
							direction="column"
							style={[
								styles.videoInfoSectionRgithSection,
								!!errors.videoName &&
									styles.videoInfoSectionRgithSectionErrorState,
							]}
						>
							<TextInput
								style={{ flex: 1 }}
								value={videoName}
								onChangeText={onFormValueChange('videoName')}
								maxLength={50}
								multiline
								placeholder="Enter your video name with maximum 50 characters (Required)"
							/>

							{errors.videoName && (
								<Text status="danger" text="Video name is required" />
							)}
						</Grid>
					</Grid>

					<Input
						label="Restaurant Name (Required)"
						value={restaurantName}
						onChangeText={onFormValueChange('restaurantName')}
						errorMessage={errors.restaurantName}
						enableCloseIcon
					/>

					<Grid direction="column" flexGrow={1} />

					<Button
						text="Publish"
						variant="primary"
						onPress={handleSubmit(onPublish)}
						disabled={
							!imageUploadResponse?.imageUrl ||
							!videoUploadResponse?.videoUrl ||
							!!errors.videoName ||
							!!errors.restaurantName ||
							!videoName ||
							!restaurantName
						}
					/>
				</>
			)}
		</SafeAreaView>
	);
};

export default EditVideoPost;
