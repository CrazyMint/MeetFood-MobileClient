import { useEffect, useRef, useState } from 'react';

export const useUpload = <Response extends unknown>(
	uploadFunc: ((filePath: string) => Promise<Response>) | undefined | null,
	filePath: string | undefined | null,
) => {
	const [response, setResponse] = useState<Response | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const uploadFuncRef = useRef(uploadFunc);
	uploadFuncRef.current = uploadFunc;

	useEffect(() => {
		if (uploadFuncRef.current && filePath) {
			uploadFuncRef.current(filePath).then(setResponse).catch(setError);

			return () => {
				setResponse(null);
				setError(null);
			};
		}
	}, [filePath]);

	return {
		response,
		error,
	};
};
