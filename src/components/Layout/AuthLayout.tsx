/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '../../hooks/useNavigation';
import { BackIcon } from '../Common/Icon';

export interface AuthLayoutProps {
	children?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	const { goBack } = useNavigation();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					height: 44,
					padding: 10,
				}}
			>
				<BackIcon size={25} color="#0F0E0E" onPress={goBack} />
			</View>
			<View style={{ flex: 1, paddingHorizontal: 16 }}>{children}</View>
		</SafeAreaView>
	);
};
