// src/components/auth/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const navigate = useNavigate();
	const { signUpUser } = useAuthService();

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: { [key: string]: string } = {};

		if (username.trim().length === 0) {
			newErrors.username = "Username is required";
		}
		if (!validateEmail(email)) {
			newErrors.email = "Invalid email address";
		}
		if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long";
		}
		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});

		try {
			await signUpUser(username, email, password);
			navigate("/login");
		} catch (error) {
			console.error(error);
			alert("Sign up failed");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
			<img
				src="/logo-blue.png"
				alt="Logo"
				className="w-32 h-32 mb-4"
			/>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
			>
				<div className="mb-4">
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
							className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 ${
								errors.username ? "border-red-500" : "border-gray-300"
							}`}
						/>
					</div>
					{errors.username && (
						<p className="text-red-500 text-xs mt-1">{errors.username}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<div className="relative">
						<FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 ${
								errors.email ? "border-red-500" : "border-gray-300"
							}`}
						/>
					</div>
					{errors.email && (
						<p className="text-red-500 text-xs mt-1">{errors.email}</p>
					)}
				</div>
				<div className="mb-4">
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
							className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 ${
								errors.password ? "border-red-500" : "border-gray-300"
							}`}
						/>
					</div>
					{errors.password && (
						<p className="text-red-500 text-xs mt-1">{errors.password}</p>
					)}
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="confirm-password"
					>
						Confirm Password
					</label>
					<div className="relative">
						<FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
						<input
							type="password"
							id="confirm-password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500 ${
								errors.confirmPassword ? "border-red-500" : "border-gray-300"
							}`}
						/>
					</div>
					{errors.confirmPassword && (
						<p className="text-red-500 text-xs mt-1">
							{errors.confirmPassword}
						</p>
					)}
				</div>
				<button
					type="submit"
					className="w-full bg-blue-900 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUp;
