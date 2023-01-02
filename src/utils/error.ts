export const isUserNotConfirmedError = (error: any) =>
	error?.name === 'UserNotConfirmedException';

export const isNoUserRecordInDBError = (error: any) => {
	try {
		return (
			JSON.parse(error?.body || {})?.errors?.[0]?.msg ===
			'Can not find the user.'
		);
	} catch (_) {
		return false;
	}
};
