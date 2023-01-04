import { VideoPost } from '../types/video';

export const separateVideoPosts = (videoPosts: Array<VideoPost>) => {
	return videoPosts.reduce(
		({ leftVideoPosts, rightVideoPosts }, videoPost, index) => {
			if (index % 2) {
				rightVideoPosts.push(videoPost);
			} else {
				leftVideoPosts.push(videoPost);
			}

			return {
				leftVideoPosts,
				rightVideoPosts,
			};
		},
		{
			leftVideoPosts: [] as Array<VideoPost>,
			rightVideoPosts: [] as Array<VideoPost>,
		},
	);
};

export const getIndex = (videoPosts: Array<VideoPost>, videoPostId: string) => {
	return videoPosts.findIndex((post) => post._id === videoPostId);
};
