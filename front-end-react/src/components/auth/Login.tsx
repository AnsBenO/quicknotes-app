// src/components/auth/Login.tsx
import "./auth.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
			<img
				src="/logo-white-notitle.png"
				alt="Logo"
				className="w-24 h-24 mb-4 animate"
			/>
			<form
				onSubmit={handleSubmit}
				className="bg-white px-6 pb-6 pt-4 rounded-lg shadow-lg w-full max-w-sm animate"
			>
				<h2 className="text-xl font-bold text-center text-gray-700 mb-4">
					Login to Your Account
				</h2>
				<div className="mb-5">
					<label
						className="block text-gray-700 text-xs font-bold mb-1"
						htmlFor="username"
					>
						Username
					</label>
					<div className="relative">
						<FaUser className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400" />
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
							placeholder="Enter your username"
						/>
					</div>
				</div>
				<div className="mb-5">
					<label
						className="block text-gray-700 text-xs font-bold mb-1"
						htmlFor="password"
					>
						Password
					</label>
					<div className="relative">
						<FaLock className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400" />
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
							placeholder="Enter your password"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-700 text-white py-1.5 px-3 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-200"
				>
					Login
				</button>
				<div className="mt-4 text-center">
					<span className="text-gray-600 text-xs">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="text-blue-500 hover:underline"
						>
							Sign up
						</Link>
					</span>
				</div>
			</form>
		</div>
	);
};

export default Login;
