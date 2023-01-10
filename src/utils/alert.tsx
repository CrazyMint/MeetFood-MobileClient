import { Alert, Linking } from 'react-native';

export const showPermissionRequestAlert = (message: string) => {
	Alert.alert('Permission Request', message, [
		{
			text: 'Cancel',
			style: 'cancel',
		},
		{
			text: 'Settings',
			onPress: Linking.openSettings,
		},
	]);
};

export const showCameraAndMicrophonePermissionRequestAlert = () => {
	showPermissionRequestAlert(
		'We need you give MeetFood permission to access your camera and microphone.',
	);
};

export const showCameraPermissionRequestAlert = () => {
	showPermissionRequestAlert(
		'We need you give MeetFood permission to access your camera.',
	);
};

export const showMicrophonePermissionRequestAlert = () => {
	showPermissionRequestAlert(
		'We need you give MeetFood permission to access your microphone.',
	);
};

export const showPhotoLibraryPermissionRequestAlert = () => {
	showPermissionRequestAlert(
		'We need you allow MeetFood to access your Photos to upload video from your device.',
	);
};
