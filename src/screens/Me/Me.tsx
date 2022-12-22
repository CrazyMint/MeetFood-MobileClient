import { Button } from '../../components/Common';
import React from 'react';
import { Text } from 'react-native';
import { Placeholder } from '../../components/Placeholder';
import { useUserContext } from '../../contexts/UserContext';

export interface MeProps {}

export const Me: React.FC<MeProps> = () => {
	const { logout } = useUserContext();
	return (
		<Placeholder>
			<Text>This is Me Screen</Text>

			<Button text="Log out" onPress={logout} />
		</Placeholder>
	);
};

export default Me;
