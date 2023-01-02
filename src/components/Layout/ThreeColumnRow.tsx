import React from 'react';
import { StyleProp } from 'react-native';

import { Grid, GridStyle } from '.';

export const DEFAULT_FLEX_BASES = {
	left: 0,
	center: 'auto',
	right: 0,
};

export const DEFAULT_FLEX_GROWS = {
	left: 1,
	center: 1,
	right: 1,
};

export const DEFAULT_FLEX_SHRINKS = {
	left: 1,
	center: 1,
	right: 1,
};

export interface ThreeColumnRowProps {
	left?: React.ReactNode;
	center?: React.ReactNode;
	right?: React.ReactNode;
	flexBases?: {
		left?: number | string;
		center?: number | string;
		right?: number | string;
	};
	flexGrows?: {
		left?: number;
		center?: number;
		right?: number;
	};
	flexShrinks?: {
		left?: number;
		center?: number;
		right?: number;
	};
	style?: StyleProp<GridStyle>;
}

export const ThreeColumnRow: React.FC<ThreeColumnRowProps> = ({
	left,
	center,
	right,
	flexBases,
	flexGrows,
	flexShrinks,
	style,
}) => {
	flexBases = {
		...DEFAULT_FLEX_BASES,
		...flexBases,
	};

	flexGrows = {
		...DEFAULT_FLEX_GROWS,
		...flexGrows,
	};

	flexShrinks = {
		...DEFAULT_FLEX_SHRINKS,
		...flexShrinks,
	};

	return (
		<Grid alignItems="center" style={style}>
			<Grid
				flexBasis={flexBases.left}
				flexGrow={flexGrows.left}
				flexShrink={flexShrinks.left}
				justifyContent="flex-start"
			>
				{left}
			</Grid>

			<Grid
				flexBasis={flexBases.center}
				flexGrow={flexGrows.center}
				flexShrink={flexShrinks.center}
				justifyContent="center"
			>
				{center}
			</Grid>

			<Grid
				flexBasis={flexBases.right}
				flexGrow={flexGrows.right}
				flexShrink={flexShrinks.right}
				justifyContent="flex-end"
			>
				{right}
			</Grid>
		</Grid>
	);
};

export default ThreeColumnRow;
