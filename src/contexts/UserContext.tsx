import { Auth } from 'aws-amplify';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { userSignin, userSignout } from '../utils/auth';
import UserAPI from '../apis/user-api';
import { User } from '../types/user';

interface CognitoUser {
	email: string;
	userId: string;
}

interface UserContextState {
	cognitoUser: CognitoUser | null;
	user: User | null;
	login: (emial: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	getUserProfile: () => Promise<void>;
}

export const UserContext = createContext<UserContextState | null>(null);

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw Error('No user context');
	}
	return context;
};

export const UserContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
	const [user, setUser] = useState<User | null>(null);

	const resetStates = useCallback(() => {
		setCognitoUser(null);
		setUser(null);
	}, []);

	const saveCognitoData = useCallback(
		(session: any | null | undefined) => {
			const idToken = session?.getIdToken();

			if (!idToken) {
				resetStates();
				throw Error(`Invalid Cognito ID token`);
			} else {
				const { sub: userId, email } = idToken.payload;
				setCognitoUser({
					userId,
					email,
				});
			}
		},
		[resetStates],
	);

	const getUserProfile = useCallback(async () => {
		const user = await UserAPI.getUserProfile();
		setUser(user);
	}, []);

	const login = useCallback(
		async (email: string, password: string) => {
			const session = await userSignin(email, password); // cognitoUser
			saveCognitoData(session.getSignInUserSession());

			const user = await UserAPI.getUserProfile();
			setUser(user);
		},
		[saveCognitoData],
	);

	const logout = useCallback(async () => {
		await userSignout();
		resetStates();
	}, [resetStates]);

	useEffect(() => {
		Auth.currentSession()
			.then(saveCognitoData)
			.then(() => getUserProfile)
			.catch(() => {
				resetStates();
			});
	}, [getUserProfile, resetStates, saveCognitoData]);

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<UserContext.Provider
			value={{ user, cognitoUser, login, logout, getUserProfile }}
		>
			{children}
		</UserContext.Provider>
	);
};
