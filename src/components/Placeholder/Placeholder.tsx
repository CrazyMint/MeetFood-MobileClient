import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface PlaceholderProps {
	children?: React.ReactNode;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ children }) => {
	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			{children}
		</SafeAreaView>
	);
};

export default Placeholder;
