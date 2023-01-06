import React, { useState } from 'react';

import { EyeIcon, EyeOffIcon } from '../Icon';
import { Input, InputProps } from './Input';

export interface SecureInputProps extends InputProps {}

export const SecureInput: React.FC<SecureInputProps> = (props) => {
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<Input
			{...props}
			accessoryRight={
				passwordVisible ? (
					<EyeIcon color="black" onPress={() => setPasswordVisible(false)} />
				) : (
					<EyeOffIcon color="black" onPress={() => setPasswordVisible(true)} />
				)
			}
			secureTextEntry={!passwordVisible}
		/>
	);
};

export default SecureInput;
