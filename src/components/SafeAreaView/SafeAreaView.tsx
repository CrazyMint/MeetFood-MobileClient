import React from 'react';
import { StatusBar, StatusBarStyle, View } from 'react-native';
import {
	Edge,
	NativeSafeAreaViewProps,
	SafeAreaView as RNSafeAreaView,
} from 'react-native-safe-area-context';

import { styles } from './styles';

export const DEFAULT_SAFE_AREA_EDGES: Array<Edge> = ['right', 'top', 'left'];
export const DEFAULT_STATUS_BAR_STYLE: StatusBarStyle = 'dark-content';
export const DEFAULT_BACKGROUND_COLOR = '#F6F6F6';

export interface SafeAreaViewProps extends NativeSafeAreaViewProps {
	statusBarStyle?: StatusBarStyle;
	backgroundColor?: string;
	bottomInset?: boolean;
	fullscreen?: boolean;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
	statusBarStyle = DEFAULT_STATUS_BAR_STYLE,
	backgroundColor = DEFAULT_BACKGROUND_COLOR,
	bottomInset = true,
	fullscreen = true,
	children,
	style,
	...rest
}) => {
	return (
		<RNSafeAreaView
			edges={[
				...DEFAULT_SAFE_AREA_EDGES,
				...(bottomInset ? ['bottom' as Edge] : []),
			]}
			style={[
				styles.container,
				fullscreen && styles.fullscreen,
				{ backgroundColor },
				style,
			]}
			{...rest}
		>
			<StatusBar barStyle={statusBarStyle} />

			<View style={styles.content}>{children}</View>
		</RNSafeAreaView>
	);
};

export default SafeAreaView;
