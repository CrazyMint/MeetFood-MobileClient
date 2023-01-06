import { MenuIcon } from '../../components/Common';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Text } from '../../components/Common/Text';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigation } from '../../hooks/useNavigation';
import { TopActions } from '../../components/Actions';
import { ThreeColumnRow, TwoColumnLayout } from '../../components/Layout';
import ProfilePic from '../../assets/profilePic.png';
import Image from '../../components/Common/Image';
import { separateVideoPosts } from '../../utils/videoPost';
import VideoCard from '../../components/VideoCard';
import { VideoPost } from '../../types/video';
import SafeAreaView from '../../components/SafeAreaView';

export interface MeProps {}

export const Me: React.FC<MeProps> = () => {
	const { user, getUserProfile } = useUserContext();
	const {
		navigateToUpdateAccountProfileScreen,
		navigateToMoreScreen,
		navigateToSingleVideoViewScreen,
	} = useNavigation();

	useEffect(() => {
		getUserProfile();
	}, [getUserProfile]);

	const videos = useMemo(
		() => user?.videos?.map((item) => item.videoPost) ?? [],
		[user?.videos],
	);

	const { leftVideoPosts, rightVideoPosts } = useMemo(
		() => separateVideoPosts(videos),
		[videos],
	);

	const onRefresh = useCallback(async () => {
		try {
			getUserProfile();
		} catch (error) {
			// Add a modal
		}
	}, [getUserProfile]);

	const onCardPress = useCallback(
		(videoPostId: string) => {
			navigateToSingleVideoViewScreen(videoPostId, true);
		},
		[navigateToSingleVideoViewScreen],
	);

	const renderCard = useCallback(
		(videoPost: VideoPost, width: number) => {
			return (
				<VideoCard
					key={videoPost._id}
					videoPost={videoPost}
					width={width}
					onPress={onCardPress}
				/>
			);
		},
		[onCardPress],
	);

	return (
		<SafeAreaView bottomInset={false}>
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

			<Text
				text={`Your videos (${user?.videos.length})`}
				style={{ marginVertical: 12, paddingHorizontal: 16 }}
			/>

			<TwoColumnLayout
				onRefresh={onRefresh}
				disableLoadMore
				marginHorizontal={20}
				renderLeftChildren={(width) =>
					leftVideoPosts.map((videoPost) => renderCard(videoPost, width))
				}
				renderRightChildren={(width) =>
					rightVideoPosts.map((videoPost) => renderCard(videoPost, width))
				}
			/>
		</SafeAreaView>
	);
};

export default Me;
