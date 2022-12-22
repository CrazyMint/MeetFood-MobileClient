import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F6671E',
		minHeight: 44,
		minWidth: 64,
		borderRadius: 22,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	basic: {
		borderRadius: 24,
		height: 48,
		width: 140,
	},
	primary: {
		borderRadius: 24,
		height: 48,
		width: '100%',
	},
	text: {
		textAlign: 'center',
		color: 'white',
		fontSize: 17,
		fontWeight: '600',
	},
	isLoading: {
		opacity: 0.7,
	},
	disabled: {
		opacity: 0.5,
	},
});
