export const isUerNotConfirmedError = (error: any) =>
	error?.name === 'UserNotConfirmedException';
