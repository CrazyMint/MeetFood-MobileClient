import { VideoPost } from './video';

export type User = {
	_id: string;
	userId: string;
	email: string;
	userName: string;
	firstName: string;
	lastName: string;
	videos: Array<{
		_id: string;
		videoPost: VideoPost;
	}>;
};
