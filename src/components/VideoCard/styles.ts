import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 8,
		backgroundColor: 'white',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		borderRadius: 10,
	},
	image: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden',
	},
	videoDescriptionContainer: {
		marginHorizontal: 8,
		marginVertical: 4,
	},
	videoTitle: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 4,
	},
	videoOwner: {
		marginRight: 4,
	},
	likeIcon: {
		width: 16,
		height: 16,
		marginRight: 5,
	},
	unlikeIcon: {
		width: 16,
		height: 16,
		marginRight: 5,
	},
});

export default styles;
