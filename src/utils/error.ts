export const isUserNotConfirmedError = (error: any) =>
	error?.name === 'UserNotConfirmedException';

export const isNoUserRecordInDBError = (error: any) => {
	try {
		return (
			JSON.parse(error?.body || {})?.errors?.[0]?.msg === 'User not found.'
		);
	} catch (_) {
		return false;
	}
};
