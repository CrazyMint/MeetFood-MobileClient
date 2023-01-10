import { BaseAPI } from './base-api';
import { VideoPost } from '../types/video';
import { getFileName } from '../utils/file';

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

	async uploadVideo(filePath: string) {
		const data = new FormData();

		data.append('video-content', {
			uri: filePath,
			name: getFileName(filePath),
			type: 'video/*',
		});

		return this.postForm('/upload', data);
	}

	async uploadCoverImage<Response = any>(filePath: string): Promise<Response> {
		const data = new FormData();

		data.append('cover-image', {
			uri: filePath,
			name: getFileName(filePath),
			type: 'image/*',
		});

		return this.postForm('/coverImage', data);
	}

	async createVideoPost({
		videoName,
		restaurantName,
		imageUrl,
		videoUrl,
	}: {
		videoName: string;
		restaurantName: string;
		imageUrl: string;
		videoUrl: string;
	}) {
		return this.postJson('/new', {
			postTitle: videoName,
			restaurantName,
			imageUrl,
			videoUrl,
		});
	}
}

export default new VideoAPI({
	schema: 'http://',
	prefix: '/video',
});
