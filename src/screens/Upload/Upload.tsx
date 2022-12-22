import React from 'react';
import { Text } from 'react-native';
import { Placeholder } from '../../components/Placeholder';
import { Button } from '@ui-kitten/components';
import { useNavigation } from '../../hooks/useNavigation';

export interface UploadProps {}

export const Upload: React.FC<UploadProps> = () => {
	const { navigateToFeedScreen } = useNavigation();

	return (
		<Placeholder>
			<Text>This is Upload Screen</Text>
			<Button onPress={navigateToFeedScreen}>
				<Text>Go Back</Text>
			</Button>
		</Placeholder>
	);
};

export default Upload;
