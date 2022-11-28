import React from 'react';
import { Text } from 'react-native';
import { Placeholder } from '../../components/Placeholder';

export interface MeProps {}

export const Me: React.FC<MeProps> = () => {
	return (
		<Placeholder>
			<Text>This is Me Screen</Text>
		</Placeholder>
	);
};

export default Me;
