export type VideoPost = {
	_id: string;
	postTitle: string;
	restaurantName: string;
	productName?: string;
	countLike: number;
	likes: VideoLike[];
	userId?: UserUploader;
	coverImageUrl: string;
	videoUrl: string;
};

export type UserUploader = {
	_id: string;
	userName: string;
	profilePhoto: string;
	userId: string;
};

export type VideoLike = {
	_id: string;
	user: string;
	userSub: string;
};
