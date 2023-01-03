import { MenuIcon } from '../../components/Common';
import React, { useEffect } from 'react';
import { Text } from '../../components/Common/Text';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigation } from '../../hooks/useNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopActions } from '../../components/Actions';
import { ThreeColumnRow } from '../../components/Layout';
import ProfilePic from '../../assets/profilePic.png';
import Image from '../../components/Common/Image';

export interface MeProps {}

export const Me: React.FC<MeProps> = () => {
	const { user, getUserProfile } = useUserContext();
	const { navigateToUpdateAccountProfileScreen, navigateToMoreScreen } =
		useNavigation();

	useEffect(() => {
		getUserProfile();
	}, [getUserProfile]);

	return (
		<SafeAreaView edges={['top', 'left', 'right']}>
			<TopActions
				center={<Text color="black" text="Account" />}
				right={<MenuIcon size={25} onPress={navigateToMoreScreen} />}
			/>

			<ThreeColumnRow
				left={
					<Image
						source={ProfilePic}
						width={80}
						height={80}
						style={{
							borderRadius: 40,
							overflow: 'hidden',
							marginHorizontal: 'auto',
						}}
					/>
				}
				center={<Text text={user?.userName} />}
				right={
					<Text
						text="Edit profile"
						color="#F6671E"
						onPress={navigateToUpdateAccountProfileScreen}
					/>
				}
				style={{
					padding: 16,
					marginHorizontal: 20,
					backgroundColor: 'white',
					borderRadius: 8,
					height: 'auto',
				}}
			/>
		</SafeAreaView>
	);
};

export default Me;
