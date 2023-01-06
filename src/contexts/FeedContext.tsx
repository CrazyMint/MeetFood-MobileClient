import React, {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';
import VideoAPI from '../apis/video-api';
import { NO_NEW_VIDEO } from '../constants/error';
import { VideoPost } from '../types/video';
import { getIndex } from '../utils/videoPost';

const SIZE = 6;

export interface FeedContextState {
	videos: Array<VideoPost>;
	fetchVideos: (refreshAll?: boolean) => Promise<void>;
	isLoading: boolean;
	error: string | null;
	currentVideoIndex: number;
	setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>;
	hasMoreVideos: boolean;
	likeVideo: (videoId: string) => Promise<void>;
	unlikeVideo: (videoId: string) => Promise<void>;
}

export const FeedContext = createContext<FeedContextState | null>(null);

export const useFeedContext = () => {
	const context = useContext(FeedContext);

	if (!context) {
		throw Error('No feed Context');
	}

	return context;
};

export const FeedContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [videos, setVideos] = useState<Array<VideoPost>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMoreVideos, setHasMoreVideos] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const pageIndex = useRef<number>(0);

	const fetchVideos = useCallback(async (refreshAll: boolean = false) => {
		try {
			setIsLoading(true);
			setError(null);

			if (refreshAll) {
				pageIndex.current = 0;
				setVideos([]);
				setCurrentVideoIndex(0);
			}

			const data = await VideoAPI.getVideoPosts({
				page: pageIndex.current,
				size: SIZE,
			});

			if (data?.length) {
				setVideos((videos) => (refreshAll ? [...data] : [...videos, ...data]));
				pageIndex.current += 1;
			}

			if (data?.length < SIZE) {
				setHasMoreVideos(false);
				throw new Error(NO_NEW_VIDEO);
			} else {
				setHasMoreVideos(true);
			}
		} catch (err: any) {
			setError(err?.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const likeVideo = useCallback(
		async (videoId: string) => {
			const newVideo = await VideoAPI.likeVideo(videoId);
			const videoIndex = getIndex(videos, videoId);

			setVideos((videos) => {
				const newVideos = videos.slice();
				newVideos.splice(videoIndex, 1, newVideo);
				return newVideos;
			});
		},
		[videos],
	);

	const unlikeVideo = useCallback(
		async (videoId: string) => {
			const newVideo = await VideoAPI.unlikeVideo(videoId);
			const videoIndex = getIndex(videos, videoId);

			setVideos((videos) => {
				const newVideos = videos.slice();
				newVideos.splice(videoIndex, 1, newVideo);
				return newVideos;
			});
		},
		[videos],
	);

	return (
		<FeedContext.Provider
			value={{
				videos,
				fetchVideos,
				isLoading,
				error,
				currentVideoIndex,
				setCurrentVideoIndex,
				hasMoreVideos,
				likeVideo,
				unlikeVideo,
			}}
		>
			{children}
		</FeedContext.Provider>
	);
};

export default FeedContextProvider;
