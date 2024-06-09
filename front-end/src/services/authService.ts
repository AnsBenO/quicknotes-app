// src/services/authService.ts
import axios from "axios";
import { useAuth } from "../contexts/authContext";

const API_URL = "http://localhost:3003/api/users";

export const useAuthService = () => {
	const { login, logout } = useAuth();

	const loginUser = async (username: string, password: string) => {
		const response = await axios.post(`${API_URL}/login`, {
			username,
			password,
		});
		if (response.data.token) {
			localStorage.setItem("authToken", response.data.token);
			login(response.data.token);
		}
		return response.data;
	};

	const signUpUser = async (
		username: string,
		email: string,
		password: string
	) => {
		const response = await axios.post(`${API_URL}/signup`, {
			username,
			email,
			password,
		});
		return response.data;
	};

	const logoutUser = async () => {
		localStorage.removeItem("authToken");
		sessionStorage.removeItem("authToken");
		try {
			await axios.post(`${API_URL}/logout`);
		} catch (error) {
			console.error("Logout request failed:", error);
		}
		logout();
	};

	const isLoggedIn = () => !!localStorage.getItem("authToken");

	return { loginUser, signUpUser, logoutUser, isLoggedIn };
};

export const logout = () => {
	localStorage.removeItem("authToken");
	sessionStorage.removeItem("authToken");
	return axios.post(`${API_URL}/logout`);
};
