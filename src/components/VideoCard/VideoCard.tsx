import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Text, Image, LikeIcon, NotLikeIcon } from '../Common';
import { Grid } from '../Layout';
import Avatar from '../Avatar';
import { VideoPost } from '../../types/video';
import { DEFAULT_CUSTOMER_AVATAR } from '../../constants/common';
import { useUserContext } from '../../contexts/UserContext';

export interface VideoCardProps {
	videoPost: VideoPost;
	width?: number;
	height?: number;
	onPress?: (videoId: string) => void;
	onLikeVideo?: (videoId: string) => void;
	onUnlikeVideo?: (videoId: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
	videoPost,
	width,
	height,
	onPress,
	onLikeVideo,
	onUnlikeVideo,
}) => {
	const { user } = useUserContext();

	const coverImgSrc = videoPost.coverImageUrl;
	const liked =
		user?._id &&
		videoPost.likes &&
		videoPost.likes.find((like) => like.user === user._id);

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				width={width}
				height={height}
				source={{
					uri: coverImgSrc,
				}}
				onPress={() => onPress?.(videoPost._id)}
				autoResizing
			/>

			<Grid style={styles.videoDescriptionContainer} direction="column">
				<Text
					style={styles.videoTitle}
					text={videoPost.postTitle}
					numberOfLines={1}
				/>

				<Grid justifyContent="space-between">
					<Grid alignItems="center">
						<Avatar
							size={24}
							uri={videoPost.userId?.profilePhoto || DEFAULT_CUSTOMER_AVATAR}
							style={styles.videoOwner}
						/>

						<Text ellipsizeMode="tail" numberOfLines={1}>
							{videoPost.userId?.userName}
						</Text>
					</Grid>

					<Grid alignItems="center">
						{liked ? (
							<LikeIcon
								color="red"
								style={styles.likeIcon}
								onPress={() => onUnlikeVideo?.(videoPost._id)}
							/>
						) : (
							<NotLikeIcon
								color="#7D7A77"
								style={styles.unlikeIcon}
								onPress={() => onLikeVideo?.(videoPost._id)}
							/>
						)}
						<Text text={videoPost.countLike} />
					</Grid>
				</Grid>
			</Grid>
		</View>
	);
};

export default VideoCard;
