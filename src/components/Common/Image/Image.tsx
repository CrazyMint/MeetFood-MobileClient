import React, { useState, useEffect, useMemo } from 'react';
import {
	View,
	Image as RNImage,
	ImageProps as RNImageProps,
	TouchableWithoutFeedback,
} from 'react-native';
import { Spinner } from '@ui-kitten/components';

import { styles } from './styles';
import { Grid } from '../../Layout';

interface Size {
	width: number | undefined;
	height: number | undefined;
	ratio: number | undefined;
}

const sizeCache: Record<string, Size> = {};

export interface ImageProps extends RNImageProps {
	width?: number | string;
	height?: number | string;
	onPress?: () => any;
	autoResizing?: boolean;
	fillContainer?: boolean;
}

export const Image: React.FC<ImageProps> = ({
	width,
	height,
	onPress,
	autoResizing,
	fillContainer,
	source,
	style,
	...rest
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [size, setSize] = useState<Size>({
		width: undefined,
		height: undefined,
		ratio: undefined,
	});

	useEffect(() => {
		if (autoResizing) {
			const firstSource = Array.isArray(source) ? source[0] : source;

			if (typeof firstSource !== 'number' && firstSource?.uri) {
				const sourceKey = JSON.stringify(source);

				if (sizeCache[sourceKey]) {
					setSize(sizeCache[sourceKey]);
				} else {
					RNImage?.getSize(firstSource.uri, (width, height) => {
						sizeCache[JSON.stringify(source)] = {
							width,
							height,
							ratio: width / height,
						};

						setSize({ width, height, ratio: width / height });
					});
				}
			}
		}
	}, [autoResizing, source]);

	const finalWidth = useMemo(
		() =>
			width ??
			(autoResizing
				? (typeof height === 'number' && typeof size.ratio === 'number'
						? height * size.ratio
						: undefined) ?? size.width
				: undefined),
		[autoResizing, height, size.ratio, size.width, width],
	);

	const finalHeight = useMemo(
		() =>
			height ??
			(autoResizing
				? (typeof width === 'number' && typeof size.ratio === 'number'
						? width / size.ratio
						: undefined) ?? size.height
				: undefined),
		[autoResizing, height, size.height, size.ratio, width],
	);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				style={{
					...(fillContainer && {
						flex: 1,
					}),
				}}
			>
				<RNImage
					source={source}
					style={[
						{
							width: finalWidth || finalHeight,
							height: finalHeight || finalWidth,
							...(fillContainer && {
								flex: 1,
							}),
						},
						style,
					]}
					onLoadEnd={() => setIsLoading(false)}
					{...rest}
				/>

				{isLoading && (
					<Grid
						style={[
							styles.loading,
							{
								width: finalWidth || finalHeight,
								height: finalHeight || finalWidth,
							},
							style,
						]}
						justifyContent="center"
						alignItems="center"
					>
						<Spinner status="basic" />
					</Grid>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Image;
