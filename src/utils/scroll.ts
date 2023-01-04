import { NativeScrollEvent } from 'react-native';

export const SCROLL_BUFFER = 24;

export const isCloseToBottom = ({
	layoutMeasurement,
	contentOffset,
	contentSize,
}: Pick<
	NativeScrollEvent,
	'layoutMeasurement' | 'contentOffset' | 'contentSize'
>) => {
	/** @reference https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end */
	// contentSize.height is the total height of the content
	// layoutMeasurement.height is the total height of the window showing the content
	// contentOffset.y is the height offset of the content during scrolling
	return (
		contentSize.height &&
		layoutMeasurement.height + contentOffset.y >=
			contentSize.height - SCROLL_BUFFER
	);
};
