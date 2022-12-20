import { Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '../Text';
import { styles } from './styles';

export interface ButtonProps {
	text?: string;
	variant?: 'default' | 'basic' | 'primary';
	onPress?: () => void | Promise<void>;
	style?: StyleProp<ViewStyle>;
	textStyle?: TextStyle;
	spinnerStatus?: EvaStatus;
	loading?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	variant = 'default',
	onPress,
	style,
	textStyle,
	spinnerStatus = 'basic',
	loading,
	disabled,
	children,
}) => {
	const isLoading = loading;
	return (
		<TouchableOpacity
			style={[
				styles.container,
				isLoading && styles.isLoading,
				disabled && styles.disabled,
				variant === 'basic' && styles.basic,
				variant === 'primary' && styles.primary,
				style,
			]}
			onPress={onPress}
			disabled={disabled || isLoading}
		>
			{isLoading ? (
				<Spinner status={spinnerStatus} />
			) : children ? (
				children
			) : (
				<Text style={[styles.text, textStyle]} text={text} />
			)}
		</TouchableOpacity>
	);
};

export default Button;
