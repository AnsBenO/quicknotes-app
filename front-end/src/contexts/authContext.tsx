// contexts/authContext.tsx
import { createContext, useState, useContext, FC, ReactNode } from "react";

interface AuthContextType {
	loggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(() => {
		const token = localStorage.getItem("authToken");

		return !!token;
	});
	const login = (token: string) => {
		localStorage.setItem("authToken", token);
		setLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ loggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
