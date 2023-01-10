import React from 'react';

import { useNavigation } from '../../hooks/useNavigation';
import SafeAreaView from '../../components/SafeAreaView';
import CameraView from '../../components/CameraView';

export interface UploadProps {}

export const Upload: React.FC<UploadProps> = () => {
	const { goBack, navigateToEditVideoPostScreen } = useNavigation();

	return (
		<SafeAreaView statusBarStyle="light-content" backgroundColor="black">
			<CameraView
				type="video"
				onCancel={goBack}
				onDone={navigateToEditVideoPostScreen}
			/>
		</SafeAreaView>
	);
};

export default Upload;
