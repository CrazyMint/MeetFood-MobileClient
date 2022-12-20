import { useCallback, useState } from 'react';

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
	const [values, setValues] = useState<T>(initialValues);
	const setFormValue = useCallback(
		(key: keyof T, value: T[keyof T]) => {
			setValues({
				...values,
				[key]: value,
			});
		},
		[values],
	);

	const onFormValueChange = useCallback(
		(key: keyof T) => {
			return (value: T[keyof T]) => setFormValue(key, value);
		},
		[setFormValue],
	);

	return { values, setFormValue, onFormValueChange };
};
