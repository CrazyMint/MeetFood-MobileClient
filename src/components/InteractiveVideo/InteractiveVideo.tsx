import React, { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	StyleProp,
	View,
	ViewStyle,
	TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import { PlayIcon, RefreshIcon } from '../Common';
import { Grid } from '../Layout';
import { styles } from './styles';

export interface InteractiveVideoProps {
	uri?: string;
	loaded?: boolean;
	paused?: boolean;
	autoPlay?: boolean;
	fillContainer?: boolean;
	enableControls?: boolean;
	style?: StyleProp<ViewStyle>;
}

export const InteractiveVideo: React.FC<InteractiveVideoProps> = ({
	uri,
	loaded = true,
	paused = false,
	autoPlay = true,
	fillContainer = false,
	enableControls = true,
	style,
}) => {
	const videoRef = useRef<Video | null>(null);
	const [isPaused, setIsPaused] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [isFinished, setIsFinished] = useState(false);

	useEffect(() => {
		if (autoPlay) {
			setIsPaused(false);
		} else {
			setIsPaused(true);
		}
	}, [autoPlay]);

	useEffect(() => {
		setIsPaused(paused);
	}, [paused]);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (enableControls) {
					if (isFinished) {
						videoRef.current?.seek(0);
						setIsFinished(false);
						setIsPaused(false);
					} else {
						setIsPaused((isPaused) => !isPaused);
					}
				}
			}}
		>
			<Grid
				direction="column"
				style={style}
				{...(fillContainer && { flex: 1 })}
			>
				{loaded && (
					<Video
						ref={videoRef}
						resizeMode="contain"
						source={{ uri }}
						style={styles.video}
						paused={isPaused}
						onLoad={() => {
							setIsLoading(false);
						}}
						onEnd={() => {
							setIsFinished(true);
							setIsPaused(true);
						}}
						repeat={false}
					/>
				)}

				<Grid
					style={styles.actionsContainer}
					justifyContent="center"
					alignItems="center"
				>
					{isLoading && <ActivityIndicator color="#F6671E" />}

					{enableControls && !isLoading && isPaused && !isFinished && (
						<View style={styles.iconContainer}>
							<PlayIcon size={40} />
						</View>
					)}

					{enableControls && !isLoading && isFinished && (
						<View style={styles.iconContainer}>
							<RefreshIcon size={40} />
						</View>
					)}
				</Grid>
			</Grid>
		</TouchableWithoutFeedback>
	);
};

export default InteractiveVideo;
