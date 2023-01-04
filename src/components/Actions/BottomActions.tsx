import React from 'react';

import { styles } from './styles';
import { ThreeColumnRow, ThreeColumnRowProps } from '../Layout';

export interface BottomActionsProps
	extends Pick<ThreeColumnRowProps, 'left' | 'center' | 'right' | 'style'> {
	backgroundColor?: string;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
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
				styles.bottomActions,
				!!backgroundColor && { backgroundColor },
				style,
			]}
		/>
	);
};

export default BottomActions;
