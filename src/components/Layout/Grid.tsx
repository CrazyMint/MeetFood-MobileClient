import React from 'react';
import { View, ViewProps, FlexStyle, ViewStyle } from 'react-native';

export type GridStyle = ViewStyle;

export interface GridProps extends ViewProps {
	direction?: FlexStyle['flexDirection'];
	alignItems?: FlexStyle['alignItems'];
	justifyContent?: FlexStyle['justifyContent'];
	flex?: FlexStyle['flex'];
	flexGrow?: FlexStyle['flexGrow'];
	flexBasis?: FlexStyle['flexBasis'];
	flexShrink?: FlexStyle['flexShrink'];
	backgroundColor?: ViewStyle['backgroundColor'];
}

export const Grid: React.FC<GridProps> = ({
	children,
	style,
	direction = 'row',
	alignItems,
	justifyContent,
	flex,
	flexGrow,
	flexBasis,
	flexShrink,
	backgroundColor,
	...rest
}) => {
	return (
		<View
			style={[
				direction !== undefined && {
					flexDirection: direction,
				},
				alignItems !== undefined && {
					alignItems,
				},
				justifyContent !== undefined && {
					justifyContent,
				},
				flex !== undefined && {
					flex,
				},
				flexGrow !== undefined && {
					flexGrow,
				},
				flexBasis !== undefined && {
					flexBasis,
				},
				flexShrink !== undefined && {
					flexShrink,
				},
				backgroundColor !== undefined && {
					backgroundColor,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</View>
	);
};

export default Grid;
