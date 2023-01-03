import { Button } from '../../components/Common/Button';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopActions } from '../../components/Actions';
import { BackIcon, Text } from '../../components/Common';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigation } from '../../hooks/useNavigation';

export const styles = StyleSheet.create({});

export interface MoreProps {}

export const More: React.FC<MoreProps> = () => {
	const { goBack, navigateToFeedScreen } = useNavigation();
	const { logout } = useUserContext();

	return (
		<SafeAreaView>
			<TopActions
				left={<BackIcon size={25} color="black" onPress={goBack} />}
				center={<Text text="More" />}
			/>

			<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
				<Button
					text="Log out"
					variant="primary"
					spinnerStatus="primary"
					onPress={async () => {
						await logout();
						navigateToFeedScreen();
					}}
					style={{
						backgroundColor: 'white',
						height: 56,
					}}
					textStyle={{ color: 'black' }}
				/>
			</View>
		</SafeAreaView>
	);
};

export default More;
