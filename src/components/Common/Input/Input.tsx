import React from 'react';
import {
	Input as UiKittenInput,
	InputProps as UiKittenInputProps,
} from '@ui-kitten/components';
import { View } from 'react-native';

import { styles } from './styles';
import Text from '../Text';
import { CloseIcon } from '../Icon';

export interface InputProps extends UiKittenInputProps {
	enableCloseIcon?: boolean;
	errorMessage?: string | null;
}

export const Input: React.FC<InputProps> = ({
	label,
	value,
	enableCloseIcon,
	errorMessage,
	style,
	onChangeText,
	accessoryRight,
	status,
	caption,
	size,
	...rest
}) => {
	return (
		<UiKittenInput
			label={
				typeof label === 'string'
					? () => <Text status="basic" style={styles.label} text={label} />
					: label
			}
			style={[styles.input, style]}
			value={value}
			size={size ?? 'large'}
			onChangeText={onChangeText}
			accessoryRight={
				<View style={styles.icon}>
					{value && enableCloseIcon ? (
						<CloseIcon color="black" onPress={() => onChangeText?.('')} />
					) : typeof accessoryRight === 'function' ? (
						accessoryRight()
					) : (
						accessoryRight
					)}
				</View>
			}
			status={errorMessage ? 'danger' : status}
			caption={
				typeof errorMessage === 'string' && errorMessage
					? () => (
							<Text
								status="danger"
								category="c1"
								style={styles.caption}
								text={errorMessage}
							/>
					  )
					: () => (
							<View style={styles.caption}>
								{typeof caption === 'function' ? caption() : caption}
							</View>
					  )
			}
			{...rest}
		/>
	);
};

export default Input;
