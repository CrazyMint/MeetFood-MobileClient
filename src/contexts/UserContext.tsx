import { Auth } from 'aws-amplify';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { userSignin, userSignout } from '../utils/auth';

interface CognitoUser {
	email: string;
	userId: string;
}

interface UserContextState {
	cognitoUser: CognitoUser | null;
	login: (emial: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
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

	const saveCognitoData = useCallback((session: any | null | undefined) => {
		const idToken = session?.getIdToken();

		if (!idToken) {
			setCognitoUser(null);
			throw Error(`Invalid Cognito ID token`);
		} else {
			const { sub: userId, email } = idToken.payload;
			setCognitoUser({
				userId,
				email,
			});
		}
	}, []);

	const login = useCallback(
		async (email: string, password: string) => {
			const session = await userSignin(email, password); // cognitoUser
			saveCognitoData(session.getSignInUserSession());
		},
		[saveCognitoData],
	);

	const logout = useCallback(async () => {
		await userSignout();
		setCognitoUser(null);
	}, []);

	useEffect(() => {
		Auth.currentSession()
			.then(saveCognitoData)
			.catch(() => {
				setCognitoUser(null);
			});
	}, [saveCognitoData]);

	return (
		// eslint-disable-next-line react/react-in-jsx-scope
		<UserContext.Provider value={{ cognitoUser, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};
