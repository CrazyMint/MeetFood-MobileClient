import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import FullScreenVideoPost from '../../components/FullScreenVideoPost/FullScreenVideoPost';
import { DEVICE_HEIGHT } from '../../constants/layout';
import { useFeedContext } from '../../contexts/FeedContext';
import { useThrottle } from '../../hooks/useThrottle';
import { VideoPost } from '../../types/video';

export const styles = StyleSheet.create({});

export interface SingleVideoFeedProps {}

export const SingleVideoFeed: React.FC<SingleVideoFeedProps> = () => {
	const {
		currentVideoIndex,
		setCurrentVideoIndex,
		videos,
		fetchVideos,
		hasMoreVideos,
	} = useFeedContext();

	const renderItem = useCallback(
		({ item, index }: { item: VideoPost; index: number }) => {
			return (
				<FullScreenVideoPost
					key={item._id}
					videoPost={item}
					isActive={currentVideoIndex === index}
				/>
			);
		},
		[currentVideoIndex],
	);

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
			if (
				viewableItems.length &&
				viewableItems[0].isViewable &&
				typeof viewableItems[0].index === 'number'
			) {
				setCurrentVideoIndex(viewableItems[0].index);
			}
		},
		[setCurrentVideoIndex],
	);

	const onEndReached = useThrottle(async () => {
		if (hasMoreVideos) {
			await fetchVideos();
		}
	}, 1000);

	return (
		<FlatList
			data={videos}
			renderItem={renderItem}
			onEndReached={onEndReached}
			keyExtractor={(item) => item._id}
			initialNumToRender={1}
			maxToRenderPerBatch={5}
			getItemLayout={(_, index) => ({
				length: DEVICE_HEIGHT,
				offset: DEVICE_HEIGHT * index,
				index,
			})}
			initialScrollIndex={currentVideoIndex}
			snapToInterval={DEVICE_HEIGHT}
			decelerationRate="fast"
			onViewableItemsChanged={onViewableItemsChanged}
			ListFooterComponent={
				hasMoreVideos ? <ActivityIndicator color="#F6671E" /> : undefined
			}
		/>
	);
};

export default SingleVideoFeed;
