import React from 'react';
import { Text } from 'react-native';
import { Placeholder } from '../../components/Placeholder';

export interface FeedProps {}

export const Feed: React.FC<FeedProps> = () => {
	return (
		<Placeholder>
			<Text>This is Feed Screen</Text>
		</Placeholder>
	);
};

export default Feed;
