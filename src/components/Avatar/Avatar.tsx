import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

export interface AvatarProps {
	uri: string;
	size: number;
	style?: StyleProp<ImageStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, size, style }) => {
	return (
		<Image
			resizeMode="cover"
			source={{
				uri,
			}}
			style={[{ height: size, width: size, borderRadius: size / 2 }, style]}
		/>
	);
};

export default Avatar;
