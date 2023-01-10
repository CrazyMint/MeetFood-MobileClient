export const getFileName = (path: string) => {
	const subPaths = path.split('/');
	return subPaths[subPaths.length - 1];
};
