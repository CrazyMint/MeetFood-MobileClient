import React from 'react';
import {
	Icon as UiKittenIcon,
	IconProps as UiKittenIconProps,
} from '@ui-kitten/components';
import { StyleProp, ViewStyle } from 'react-native';

const DEFAULT_COLOR = '#F6671E';

export interface IconProps extends Omit<UiKittenIconProps, 'name'> {
	fill?: string;
	color?: string;
	size?: number;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void | Promise<void>;
}

export const IconGetter = (name: string) => {
	const component: React.FC<IconProps> = ({
		fill,
		color,
		size,
		style,
		...rest
	}) => {
		return (
			<UiKittenIcon
				name={name}
				fill={fill ?? color ?? DEFAULT_COLOR}
				style={[
					size && {
						width: size,
						height: size,
					},
					style,
				]}
				{...rest}
			/>
		);
	};

	return component;
};

export default IconGetter;

export const LockIcon = IconGetter('lock');
export const CloseIcon = IconGetter('close-outline');
export const EyeIcon = IconGetter('eye-outline');
export const EyeOffIcon = IconGetter('eye-off-outline');
export const BackIcon = IconGetter('arrow-ios-back-outline');
export const MenuIcon = IconGetter('menu-outline');
export const NotLikeIcon = IconGetter('heart-outline');
export const LikeIcon = IconGetter('heart');
export const PlayIcon = IconGetter('arrow-right');
export const RefreshIcon = IconGetter('refresh-outline');
export const CheckIcon = IconGetter('checkmark-outline');
