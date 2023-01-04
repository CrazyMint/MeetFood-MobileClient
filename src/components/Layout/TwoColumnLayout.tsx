import React, { useCallback, useMemo, useState } from 'react';
import {
	ScrollView,
	ActivityIndicator,
	RefreshControl,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';

import { styles } from './styles';
import { Grid } from '.';
import { isCloseToBottom } from '../../utils/scroll';
import { DEVICE_WIDTH, COLUMN_SPACING } from '../../constants/layout';

export interface TwoColumnLayoutProps {
	onRefresh?: () => void | Promise<void>;
	onReachBottom?: () => void | Promise<void>;
	disableLoadMore?: boolean;
	columnSpacing?: number;
	marginHorizontal?: number;
	renderLeftChildren: (
		columnWidth: number,
	) => React.ReactNode | Array<React.ReactNode>;
	renderRightChildren: (
		columnWidth: number,
	) => React.ReactNode | Array<React.ReactNode>;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
	onRefresh,
	onReachBottom,
	disableLoadMore = false,
	columnSpacing = COLUMN_SPACING,
	marginHorizontal = COLUMN_SPACING,
	renderLeftChildren,
	renderRightChildren,
}) => {
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const columnWidth = useMemo(
		() => (DEVICE_WIDTH - columnSpacing - marginHorizontal * 2) / 2,
		[columnSpacing, marginHorizontal],
	);

	const onScroll = useCallback(
		({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
			if (!disableLoadMore && isCloseToBottom(nativeEvent)) {
				onReachBottom?.();
			}
		},
		[disableLoadMore, onReachBottom],
	);

	const internalOnRefresh = useCallback(async () => {
		setIsRefreshing(true);
		await onRefresh?.();
		setIsRefreshing(false);
	}, [onRefresh]);

	return (
		<ScrollView
			onScroll={onScroll}
			scrollEventThrottle={5}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={internalOnRefresh}
				/>
			}
		>
			<Grid>
				<Grid
					direction="column"
					style={{
						marginLeft: marginHorizontal,
						marginRight: columnSpacing / 2,
					}}
				>
					{renderLeftChildren(columnWidth)}
				</Grid>
				<Grid
					direction="column"
					style={{
						marginLeft: columnSpacing / 2,
						marginRight: marginHorizontal,
					}}
				>
					{renderRightChildren(columnWidth)}
				</Grid>
			</Grid>

			{!disableLoadMore && (
				<ActivityIndicator style={styles.activityIndicator} />
			)}
		</ScrollView>
	);
};

export default TwoColumnLayout;
