// contexts/authContext.tsx
import {
	createContext,
	useState,
	FC,
	ReactNode,
	useMemo,
	useCallback,
} from "react";

interface AuthContextType {
	loggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(() => {
		const token = localStorage.getItem("authToken");

		return !!token;
	});

	const login = useCallback((token: string) => {
		localStorage.setItem("authToken", token);
		setLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("authToken");
		setLoggedIn(false);
	}, []);

	return (
		<AuthContext.Provider
			value={useMemo(
				() => ({ loggedIn, login, logout }),
				[loggedIn, login, logout]
			)}
		>
			{children}
		</AuthContext.Provider>
	);
};
