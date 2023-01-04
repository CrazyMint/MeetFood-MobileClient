import { StyleSheet } from 'react-native';

import {
	DEVICE_WIDTH,
	TOP_ACTIONS_HEIGHT,
	ACTIONS_BOTTOM_SPACING,
	BOTTOM_ACTIONS_HEIGHT,
} from '../../constants/layout';

export const styles = StyleSheet.create({
	topActions: {
		height: TOP_ACTIONS_HEIGHT,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: DEVICE_WIDTH,
	},
	bottomActions: {
		height: BOTTOM_ACTIONS_HEIGHT,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: DEVICE_WIDTH,
	},
	leftActions: {
		position: 'absolute',
		zIndex: 1000,
		left: 0,
		bottom: ACTIONS_BOTTOM_SPACING,
		width: DEVICE_WIDTH / 2,
	},
});
