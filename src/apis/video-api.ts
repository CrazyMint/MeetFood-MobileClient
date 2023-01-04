import { BaseAPI } from './base-api';
import { VideoPost } from '../types/video';

class VideoAPI extends BaseAPI {
	async getVideoPosts({
		page,
		size,
	}: {
		page?: number;
		size?: number;
	} = {}): Promise<Array<VideoPost>> {
		return this.get('/videos', {
			queryParams: {
				page,
				size,
			},
			withAuthToken: false,
		});
	}

	async likeVideo(videoPostId: string) {
		return this.put(`/like/${videoPostId}`);
	}

	async unlikeVideo(videoPostId: string) {
		return this.put(`/unlike/${videoPostId}`);
	}

	async deleteVideo(videoPostId: string) {
		return this.delete(`/customer/${videoPostId}`);
	}
}

export default new VideoAPI({
	schema: 'http://',
	prefix: '/video',
});
