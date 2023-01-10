export const MAX_RECORDING_TIME = 3600;

export const getRecordingTimeString = (seconds: number | undefined | null) => {
	if (typeof seconds !== 'number') {
		return '';
	}

	if (seconds >= MAX_RECORDING_TIME) {
		throw Error(
			`Too long recording time in seconds. Maximum is ${MAX_RECORDING_TIME}. Getting ${seconds}`,
		);
	}

	const minutes = Math.trunc(seconds / 60);
	seconds = seconds - minutes * 60;

	const minutesString = minutes > 9 ? minutes.toString() : `0${minutes}`;
	const secondsString = seconds > 9 ? seconds.toString() : `0${seconds}`;

	return `${minutesString}:${secondsString}`;
};
