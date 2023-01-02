import { getAuthToken } from '../utils/auth';

export const DEFAULT_REQUEST_SCHEMA = 'http://';
export const DEFAULT_API_HOST =
	'meetfoodaustin-env.eba-m7kud6rj.us-east-2.elasticbeanstalk.com';

const getString = (object: any) => {
	return typeof object === 'object' ? JSON.stringify(object) : String(object);
};

const getRejectedResponse = (response: Response, body: any) => {
	return Promise.reject({
		status: response.status,
		body: getString(body),
	});
};

export interface RequestOption extends RequestInit {
	withAuthToken?: boolean;
	queryParams?: Record<string, any>;
	logging?: boolean;
}

export interface BaseAPIProps {
	schema?: string;
	host?: string;
	prefix?: string;
}

export abstract class BaseAPI {
	private schema: string;
	private host: string;
	private prefix: string;

	constructor({
		prefix = '',
		schema = DEFAULT_REQUEST_SCHEMA,
		host = DEFAULT_API_HOST,
	}: BaseAPIProps) {
		this.schema = schema;
		this.host = host;
		this.prefix = prefix;
	}

	protected async fetch(path: string, options: RequestOption) {
		let url = [this.schema, this.host, this.prefix, path].join('');
		let token;

		if (options.queryParams) {
			const searchParams = new URLSearchParams();
			Object.entries(options.queryParams).forEach(([key, value]) => {
				searchParams.append(key, getString(value));
			});
			url += `?${searchParams}`;
		}

		if (options.withAuthToken || options.withAuthToken === undefined) {
			token = await getAuthToken();
			options.headers = new Headers({
				'cognito-token': token,
				...options.headers,
			});
		}

		const loggingAttributes = {
			url,
			method: options.method,
			body: getString(options.body),
		};

		return fetch(url, options)
			.then((response) => {
				if (response.status >= 200 && response.status < 400) {
					return response.json();
				} else {
					return response.json().then(
						(json) => getRejectedResponse(response, json),
						(error) => getRejectedResponse(response, error),
					);
				}
			})
			.then((data) => {
				if (options.logging || options.logging === undefined) {
					console.log({
						message: 'API succeeded',
						request: loggingAttributes,
						response: data,
					});
				}
				return data;
			})
			.catch((error) => {
				if (options.logging || options.logging === undefined) {
					console.log({
						message: 'API failed',
						request: loggingAttributes,
						response: error,
					});
				}
				throw error;
			});
	}

	protected async get(path: string, options?: Omit<RequestOption, 'method'>) {
		return this.fetch(path, { ...options, method: 'GET' });
	}

	protected async put(path: string, options?: Omit<RequestOption, 'method'>) {
		return this.fetch(path, { ...options, method: 'PUT' });
	}

	protected async post(path: string, options?: Omit<RequestOption, 'method'>) {
		return this.fetch(path, { ...options, method: 'POST' });
	}

	protected async delete(
		path: string,
		options?: Omit<RequestOption, 'method'>,
	) {
		return this.fetch(path, { ...options, method: 'DELETE' });
	}

	protected async postForm(
		path: string,
		form: FormData,
		options?: Omit<RequestOption, 'method' | 'body'>,
	) {
		return this.post(path, {
			...options,
			headers: {
				...options?.headers,
				'Content-Type': 'multipart/form-data',
			},
			body: form,
		});
	}

	protected async postJson(
		path: string,
		body: object,
		options?: Omit<RequestOption, 'method' | 'body'>,
	) {
		return this.post(path, {
			...options,
			headers: {
				...options?.headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	}
}
