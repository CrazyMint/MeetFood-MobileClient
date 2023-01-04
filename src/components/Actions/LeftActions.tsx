import React from 'react';
import { StyleProp } from 'react-native';

import { styles } from './styles';
import { Grid, GridStyle } from '../Layout';

export interface LeftActionsProps {
	style?: StyleProp<GridStyle>;
	backgroundColor?: string;
	children?: React.ReactNode;
	content?: React.ReactNode[] | React.ReactNode;
}

export const LeftActions: React.FC<LeftActionsProps> = ({
	style,
	backgroundColor,
	children,
	content,
}) => {
	return (
		<Grid
			direction="column"
			style={[
				styles.leftActions,
				!!backgroundColor && { backgroundColor },
				style,
			]}
		>
			{children ?? content}
		</Grid>
	);
};

export default LeftActions;
