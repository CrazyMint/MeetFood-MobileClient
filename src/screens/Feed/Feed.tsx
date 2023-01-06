import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../../components/Common';
import { Grid, TwoColumnLayout } from '../../components/Layout';
import SafeAreaView from '../../components/SafeAreaView';
import VideoCard from '../../components/VideoCard';
import { NO_NEW_VIDEO } from '../../constants/error';
import { useFeedContext } from '../../contexts/FeedContext';
import { useNavigation } from '../../hooks/useNavigation';
import { useThrottle } from '../../hooks/useThrottle';
import { VideoPost } from '../../types/video';
import { getIndex, separateVideoPosts } from '../../utils/videoPost';

export interface FeedProps {}

export const Feed: React.FC<FeedProps> = () => {
	const {
		videos,
		fetchVideos,
		error,
		setCurrentVideoIndex,
		likeVideo,
		unlikeVideo,
	} = useFeedContext();

	const { navigateToSingleVideoFeedScreen } = useNavigation();

	const { leftVideoPosts, rightVideoPosts } = useMemo(
		() => separateVideoPosts(videos),
		[videos],
	);

	useEffect(() => {
		fetchVideos();
	}, [fetchVideos]);

	const onRefresh = useCallback(() => {
		fetchVideos(true);
	}, [fetchVideos]);

	const onReachBottom = useThrottle(() => {
		if (videos.length) {
			fetchVideos();
		}
	}, 1000);

	const onCardPress = useCallback(
		(videoId: string) => {
			setCurrentVideoIndex(getIndex(videos, videoId));
			navigateToSingleVideoFeedScreen();
		},
		[navigateToSingleVideoFeedScreen, setCurrentVideoIndex, videos],
	);

	const renderCard = useCallback(
		(videoPost: VideoPost, width: number) => {
			return (
				<VideoCard
					key={videoPost._id}
					videoPost={videoPost}
					width={width}
					onPress={onCardPress}
					onLikeVideo={likeVideo}
					onUnlikeVideo={unlikeVideo}
				/>
			);
		},
		[likeVideo, onCardPress, unlikeVideo],
	);

	return (
		<SafeAreaView fullscreen={false} bottomInset={false}>
			<Grid
				style={{ paddingVertical: 12 }}
				justifyContent="center"
				alignItems="center"
			>
				<View
					style={{
						paddingBottom: 5,
						borderBottomColor: '#F6671E',
						borderBottomWidth: 3,
					}}
				>
					<Text category="s1" status="basic" text="Explore" />
				</View>
			</Grid>

			<TwoColumnLayout
				onRefresh={onRefresh}
				onReachBottom={onReachBottom}
				disableLoadMore={!videos.length || error === NO_NEW_VIDEO}
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

export default Feed;
