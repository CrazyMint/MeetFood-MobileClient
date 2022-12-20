import React from 'react';
import {
	Text as UiKittenText,
	TextProps as UiKittenTextProps,
} from '@ui-kitten/components';
import { styles } from './styles';

export interface TextProps extends UiKittenTextProps {
	text?: string | number | null;
	color?: string;
	disabled?: boolean;
}

export const Text: React.FC<TextProps> = ({
	text,
	color,
	disabled,
	onPress,
	children,
	style,
	...rest
}) => {
	const realChildren = text ?? children;
	return (
		<UiKittenText
			style={[
				{
					...(color && { color }),
				},
				disabled && styles.disabled,
				!disabled && !!onPress && styles.pressable,
				style,
			]}
			{...(!disabled && { onPress })}
			{...rest}
		>
			{realChildren}
		</UiKittenText>
	);
};

export default Text;
