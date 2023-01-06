import { useRef, useCallback } from 'react';

// 节流函数
export const useThrottle = <
	Arguments extends Array<any>,
	ReturnValue extends Promise<any> | any,
>(
	callback: (...args: Arguments) => ReturnValue,
	ms: number,
): ((...args: Arguments) => ReturnValue | void) => {
	const waitRef = useRef(false);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;

	return useCallback(
		(...args: Arguments) => {
			if (!waitRef.current) {
				waitRef.current = true;
				setTimeout(() => {
					waitRef.current = false;
				}, ms);

				const res = callbackRef.current(...args) as ReturnValue;

				return res;
			}
		},
		[ms],
	);
};
