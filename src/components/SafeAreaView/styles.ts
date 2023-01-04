import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/layout';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	fullscreen: {
		height: DEVICE_HEIGHT,
		width: DEVICE_WIDTH,
	},
	content: {
		position: 'relative',
		flex: 1,
	},
});

export default styles;
