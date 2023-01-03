import { BaseAPI } from './base-api';
import { User } from '../types/user';

interface UpdateUserData {
	userName: string;
	firstName: string;
	lastName: string;
}

class UserAPI extends BaseAPI {
	async createUser(email: string) {
		return this.postJson('/new', {
			email,
		});
	}

	async updateUser({ userName, firstName, lastName }: UpdateUserData) {
		return this.postJson('/profile/me', {
			userName,
			firstName,
			lastName,
		});
	}

	async getUserProfile(): Promise<User> {
		return this.get('/profile/me');
	}
}

export default new UserAPI({
	prefix: '/user',
});
