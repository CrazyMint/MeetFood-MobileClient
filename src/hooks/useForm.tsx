import { useCallback, useState } from 'react';

export type FunctionValidator = (value: any) => string | null;
export type PreDefinedValidator = 'required';

const requiredValidator: FunctionValidator = (value: any) => {
	if (value === undefined || value === null || value === '') {
		return 'This is required';
	}
	return null;
};

export type Validator = FunctionValidator | PreDefinedValidator;
export type ValidatorLookup<ValueLookup> = Partial<
	Record<keyof ValueLookup, Validator | Array<Validator>>
>;

export type ErrorLookup<ValueLookup> = Record<keyof ValueLookup, string | null>;

export const useForm = <ValueLookup extends Record<string, any>>(
	initialValues: ValueLookup,
	validators?: ValidatorLookup<ValueLookup>,
) => {
	const [values, setValues] = useState<ValueLookup>(initialValues);
	const [errors, setErrors] = useState<ErrorLookup<ValueLookup>>(
		Object.keys(initialValues).reduce((lookup, key) => {
			lookup[key as keyof ValueLookup] = null;
			return lookup;
		}, {} as ErrorLookup<ValueLookup>),
	);

	const getErrorMessage = useCallback(
		(key: keyof ValueLookup, value: ValueLookup[keyof ValueLookup]) => {
			const _getErrorMessage = (validator: Validator) => {
				let errorMessage: string | null = null;
				if (typeof validator === 'function') {
					errorMessage = validator(value);
				} else if (typeof validator === 'string') {
					if (validator === 'required') {
						errorMessage = requiredValidator(value);
					} else {
						throw Error(`Unknown pre_defined validator ${validator}`);
					}
				}
				return errorMessage;
			};

			if (validators?.[key]) {
				if (Array.isArray(validators[key])) {
					for (let validator of validators?.[key] as Array<Validator>) {
						const errorMessage = _getErrorMessage(validator);
						if (errorMessage) return errorMessage;
					}
				} else {
					return _getErrorMessage(validators[key] as Validator) ?? null;
				}
			}
			return null;
		},
		[validators],
	);

	const setFormValue = useCallback(
		(key: keyof ValueLookup, value: ValueLookup[keyof ValueLookup]) => {
			setValues({
				...values,
				[key]: value,
			});
			setErrors((errors) => ({
				...errors,
				[key]: getErrorMessage(key, value),
			}));
		},
		[getErrorMessage, values],
	);

	const onFormValueChange = useCallback(
		(key: keyof ValueLookup) => {
			return (value: ValueLookup[keyof ValueLookup]) =>
				setFormValue(key, value);
		},
		[setFormValue],
	);

	const setFormError = useCallback(
		(key: keyof ValueLookup, error: string | null) => {
			setErrors((errors) => ({
				...errors,
				[key]: error,
			}));
		},
		[],
	);

	const setFormErrors = useCallback(
		(errors: Partial<ErrorLookup<ValueLookup>> | string | null) => {
			if (typeof errors === 'string' || errors === null) {
				setErrors((_errors) => {
					return Object.keys(_errors).reduce((lookup, key) => {
						lookup[key as keyof ValueLookup] = errors;
						return lookup;
					}, {} as ErrorLookup<ValueLookup>);
				});
			} else {
				setErrors((_errors) => ({
					..._errors,
					...errors,
				}));
			}
		},
		[],
	);

	const handleSubmit = useCallback(
		(callback: (value: ValueLookup) => any) => {
			return async () => {
				let hasError = false;
				const newErrors = Object.entries(values).reduce(
					(lookup, [key, value]) => {
						lookup[key as keyof ValueLookup] = getErrorMessage(key, value);
						if (lookup[key]) {
							hasError = true;
						}
						return lookup;
					},
					{} as ErrorLookup<ValueLookup>,
				);
				setErrors(newErrors);
				return hasError ? undefined : await callback(values);
			};
		},
		[getErrorMessage, values],
	);

	return {
		values,
		setFormValue,
		onFormValueChange,
		errors,
		setFormError,
		setFormErrors,
		handleSubmit,
	};
};
