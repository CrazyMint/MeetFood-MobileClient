import React from 'react';
import { styles } from './styles';

import { ThreeColumnRow, ThreeColumnRowProps } from '../Layout';

export interface TopActionsProps
	extends Pick<ThreeColumnRowProps, 'left' | 'center' | 'right' | 'style'> {
	backgroundColor?: string;
}

export const TopActions: React.FC<TopActionsProps> = ({
	left,
	center,
	right,
	style,
	backgroundColor,
}) => {
	return (
		<ThreeColumnRow
			left={left}
			center={center}
			right={right}
			style={[
				styles.topActions,
				backgroundColor !== undefined && { backgroundColor },
				style,
			]}
		/>
	);
};

export default TopActions;
