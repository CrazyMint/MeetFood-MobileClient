import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, TOP_ACTIONS_HEIGHT } from '../../constants/layout';

export const styles = StyleSheet.create({
	topActions: {
		height: TOP_ACTIONS_HEIGHT,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: DEVICE_WIDTH,
	},
});
