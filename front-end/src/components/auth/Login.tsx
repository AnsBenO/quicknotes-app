// src/components/auth/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { FaUser, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();
	const { loginUser } = useAuthService();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await loginUser(username, password);
			navigate("/notes");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<img
				src="/logo-blue.png"
				alt="Logo"
				className="w-32 h-32 mb-4"
			/>
			<form
				onSubmit={handleSubmit}
				className="bg-white px-8 pb-8 pt-4 rounded-lg shadow-md w-full max-w-md"
			>
				<div className="my-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<div className="relative">
						<FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
						/>
					</div>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<div className="relative">
						<FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-900 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
