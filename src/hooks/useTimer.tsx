import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_TIME_INCREMENT = 1;
const DEFAULT_TIME_UPDATE_FREQUENCY = 1000;
const DEFAULT_INITIAL_VALUE = 0;
const DEFAULT_VALUE_LIMIT = null;

export interface UseTimerProps {
	increment?: number;
	frequency?: number;
	initialValue?: number;
	valueLimit?: number | null;
}

export const useTimer = ({
	increment = DEFAULT_TIME_INCREMENT,
	frequency = DEFAULT_TIME_UPDATE_FREQUENCY,
	initialValue = DEFAULT_INITIAL_VALUE,
	valueLimit = DEFAULT_VALUE_LIMIT,
}: UseTimerProps) => {
	const timeRef = useRef<number>(0);
	const [time, setTime] = useState(0);
	const [enable, setEnable] = useState(false);
	const incrementRef = useRef<number>(increment);
	const frequencyRef = useRef<number>(frequency);
	const initialValueRef = useRef<number>(initialValue);
	const valueLimitRef = useRef<number | null>(valueLimit);

	useEffect(() => {
		incrementRef.current = increment;
	}, [increment]);
	useEffect(() => {
		frequencyRef.current = frequency;
	}, [frequency]);
	useEffect(() => {
		initialValueRef.current = initialValue;
	}, [initialValue]);
	useEffect(() => {
		valueLimitRef.current = valueLimit;
	}, [valueLimit]);

	useEffect(() => {
		if (enable) {
			const intervalId = setInterval(() => {
				timeRef.current = timeRef.current + incrementRef.current;
				setTime(timeRef.current);

				if (
					typeof valueLimitRef.current === 'number' &&
					((incrementRef.current > 0 &&
						timeRef.current >= valueLimitRef.current) ||
						(incrementRef.current < 0 &&
							timeRef.current <= valueLimitRef.current))
				) {
					clearInterval(intervalId);
				}
			}, frequencyRef.current);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [enable]);

	return {
		time,
		start: useCallback(() => {
			setEnable(true);
			timeRef.current = initialValueRef.current;
		}, []),
		stop: useCallback(() => {
			setEnable(false);
			initialValueRef.current = timeRef.current;
		}, []),
		clear: useCallback(() => {
			setEnable(false);
			initialValueRef.current = initialValue;
			setTime(initialValue);
		}, [initialValue]),
	};
};
