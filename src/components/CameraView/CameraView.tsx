import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageCropPicker, { Video } from 'react-native-image-crop-picker';
import { MediaType } from '../../constants/common';
import {
	NOT_AUTHORIZED_AUDIO_PERMISSION,
	NOT_AUTHORIZED_PHOTO_LIBRARY_PERMISSION,
	USER_CANCELLED_IMAGE_SELECTION,
} from '../../constants/error';
import { MAX_VIDEO_DURATION, MAX_VIDEO_SIZE } from '../../constants/limit';
import { useModalContext } from '../../contexts/ModalContext';
import { useTimer } from '../../hooks/useTimer';
import {
	showCameraAndMicrophonePermissionRequestAlert,
	showCameraPermissionRequestAlert,
	showMicrophonePermissionRequestAlert,
	showPhotoLibraryPermissionRequestAlert,
} from '../../utils/alert';
import { getRecordingTimeString } from '../../utils/time';
import { BottomActions, TopActions } from '../Actions';
import { BackIcon, CheckIcon, CloseIcon, Text, Image } from '../Common';
import InteractiveVideo from '../InteractiveVideo';
import { Grid, GridStyle } from '../Layout';
import LibraryPNG from '../../assets/library.png';
import CameraPNG from '../../assets/camera.png';

export const styles = StyleSheet.create({
	bottomActionsShutterRound: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#F6671E',
	},
	bottomActionsShutterSquare: {
		width: 20,
		height: 20,
		borderRadius: 5,
		backgroundColor: '#F6671E',
	},
});

export interface CameraViewProps {
	type: MediaType;
	onCancel: () => void;
	onDone: (path: string) => void;
	style?: GridStyle;
}

export const CameraView: React.FC<CameraViewProps> = ({
	type,
	onCancel,
	onDone,
	style,
}) => {
	const isFocused = useIsFocused();
	const cameraRef = useRef<RNCamera>(null);
	const [pickedVideoDuration, setPickedVideoDuration] = useState(0);
	const [isBackCamera, setIsBackCamera] = useState(true);
	const [mediaPath, setMediaPath] = useState('');
	const {
		time: recordDuration,
		start: onRecordingTimerStart,
		stop: onRecordingTimerStop,
		clear: onRecordingTimerClear,
	} = useTimer({});
	const { openModal } = useModalContext();
	const finalDuration = pickedVideoDuration || recordDuration;
	const [isRecording, setIsRecording] = useState(false);

	const onLibraryOpen = useCallback(async () => {
		try {
			const media = await ImageCropPicker.openPicker({
				mediaType: type,
				compressVideoPreset: '1280x720',
			});

			if (type === 'video') {
				const { size, duration } = media as Video;

				if (size > MAX_VIDEO_SIZE) {
					openModal({
						title: 'Video is too large',
						message: `The maximum video is ${MAX_VIDEO_SIZE}MB`,
					});

					return;
				}

				if (duration) {
					if (duration > MAX_VIDEO_DURATION) {
						openModal({
							title: 'Video exceeds limit',
							message: `Video cannot exceed ${
								MAX_VIDEO_DURATION / 1000
							} seconds`,
						});

						return;
					}

					setPickedVideoDuration(Math.floor(duration / 1000));
				}
			}
		} catch (error: any) {
			if (error?.message === NOT_AUTHORIZED_PHOTO_LIBRARY_PERMISSION) {
				showPhotoLibraryPermissionRequestAlert();
			} else if (error?.message === USER_CANCELLED_IMAGE_SELECTION) {
				openModal({
					title: 'Error',
					message: error?.message || 'Failed to choose media in library',
				});
			}
		}
	}, [openModal, type]);

	const checkPermission = useCallback(
		async (callback: (camera: RNCamera) => void | Promise<void>) => {
			if (cameraRef.current) {
				const { isAuthorized, recordAudioPermissionStatus } = cameraRef.current
					.state as {
					isAuthorizationChecked: boolean;
					isAuthorized: boolean;
					recordAudioPermissionStatus: string;
				};

				if (
					!isAuthorized &&
					recordAudioPermissionStatus === NOT_AUTHORIZED_AUDIO_PERMISSION
				) {
					showCameraAndMicrophonePermissionRequestAlert();
				} else if (!isAuthorized) {
					showCameraPermissionRequestAlert();
				} else if (
					recordAudioPermissionStatus === NOT_AUTHORIZED_AUDIO_PERMISSION
				) {
					showMicrophonePermissionRequestAlert();
				} else {
					await callback(cameraRef.current);
				}
			} else {
				openModal({
					title: 'Error',
					message: 'No camera found',
				});
			}
		},
		[openModal],
	);

	const onRecordingStart = useCallback(() => {
		checkPermission(async (camera) => {
			camera
				.recordAsync({
					maxDuration: MAX_VIDEO_DURATION / 1000,
					quality: RNCamera.Constants.VideoQuality['720p'],
					maxFileSize: MAX_VIDEO_SIZE,
				})
				.then(({ uri }) => {
					setMediaPath(uri);
				})
				.catch((error) => {
					openModal({
						title: 'Error',
						message: error?.message || 'Failed to record',
					});
				});

			setIsRecording(true);
			onRecordingTimerStart();
		});
	}, [checkPermission, onRecordingTimerStart, openModal]);

	const onReocrdingEnd = useCallback(() => {
		checkPermission((camera) => {
			camera.stopRecording();
			setIsRecording(false);
			onRecordingTimerStop();
		});
	}, [checkPermission, onRecordingTimerStop]);

	const onPictureTake = useCallback(() => {
		checkPermission(async (camera) => {
			camera.takePictureAsync({ quality: 720 }).then(({ uri }) => {
				setMediaPath(uri);
			});
		});
	}, [checkPermission]);

	const onShutterPress = useCallback(() => {
		if (type === 'video') {
			if (isRecording) {
				onReocrdingEnd();
			} else {
				onRecordingStart();
			}
		} else {
			onPictureTake();
		}
	}, [isRecording, onPictureTake, onRecordingStart, onReocrdingEnd, type]);

	return (
		<Grid direction="column" flexGrow={1} style={style}>
			<TopActions
				left={
					mediaPath ? (
						<BackIcon
							size={25}
							color="white"
							onPress={() => {
								setMediaPath('');
								onRecordingTimerClear();
								setPickedVideoDuration(0);
							}}
						/>
					) : (
						<CloseIcon size={25} color="white" onPress={onCancel} />
					)
				}
				center={
					type === 'photo' ? (
						<Text color="white" text="Take Photo" />
					) : (
						<Grid direction="column" alignItems="center">
							<Text
								color="white"
								text={`Record up to ${MAX_VIDEO_DURATION / 1000}s`}
							/>
							<Text
								color="white"
								text={getRecordingTimeString(finalDuration)}
							/>
						</Grid>
					)
				}
				right={
					mediaPath && (
						<CheckIcon
							size={25}
							color="white"
							onPress={() => onDone(mediaPath)}
						/>
					)
				}
			/>

			{mediaPath === '' ? (
				<RNCamera
					ref={cameraRef}
					type={
						isBackCamera
							? RNCamera.Constants.Type.back
							: RNCamera.Constants.Type.front
					}
					flashMode={RNCamera.Constants.FlashMode.off}
					androidCameraPermissionOptions={{
						title: 'Permission Request',
						message: 'We need you give permission to access your camera',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel',
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission Request',
						message: 'We need you give permission to access your microphone',
						buttonPositive: 'Ok',
						buttonNegative: 'Cancel',
					}}
					style={{ flex: 1 }}
				/>
			) : type === 'video' ? (
				<InteractiveVideo uri={mediaPath} fillContainer paused={!isFocused} />
			) : (
				<Image
					source={{
						uri: mediaPath,
					}}
					fillContainer
				/>
			)}

			<BottomActions
				left={
					<Image
						source={LibraryPNG}
						onPress={onLibraryOpen}
						style={{ width: 30, height: 30 }}
					/>
				}
				center={
					!mediaPath && (
						<TouchableOpacity
							onPress={onShutterPress}
							style={{
								width: 54,
								height: 54,
								borderRadius: 27,
								borderColor: 'white',
								borderWidth: 3,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<View
								style={[
									styles.bottomActionsShutterRound,
									isRecording && styles.bottomActionsShutterSquare,
								]}
							/>
						</TouchableOpacity>
					)
				}
				right={
					!mediaPath && (
						<Image
							source={CameraPNG}
							onPress={() => setIsBackCamera(!isBackCamera)}
							style={{ width: 30, height: 30 }}
						/>
					)
				}
			/>
		</Grid>
	);
};

export default CameraView;
