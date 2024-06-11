// src/components/auth/SignUp.tsx
import "./auth.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
		<div className="flex flex-col items-center justify-center min-h-screen h-fit bg-gradient-to-r from-blue-500 to-blue-900">
			<img
				src="/logo-white-notitle.png"
				alt="Logo"
				className="w-24 h-24 mb-4 animate"
			/>
			<form
				onSubmit={handleSubmit}
				className="bg-white px-6 pb-4 pt-4 rounded-lg shadow-lg w-full max-w-sm animate"
			>
				<h2 className="text-xl font-bold text-center text-gray-700 mb-4">
					Create Your Account
				</h2>
				<div className="mb-3">
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
							className={`w-full pl-8 pr-2 py-1.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
								errors.username
									? "border-red-500"
									: "border-gray-300"
							}`}
							placeholder="Enter your username"
						/>
					</div>
					{errors.username && (
						<p className="text-red-500 text-xs mt-1">
							{errors.username}
						</p>
					)}
				</div>
				<div className="mb-3">
					<label
						className="block text-gray-700 text-xs font-bold mb-1"
						htmlFor="email"
					>
						Email
					</label>
					<div className="relative">
						<FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400" />
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`w-full pl-8 pr-2 py-1.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
								errors.email
									? "border-red-500"
									: "border-gray-300"
							}`}
							placeholder="Enter your email"
						/>
					</div>
					{errors.email && (
						<p className="text-red-500 text-xs mt-1">
							{errors.email}
						</p>
					)}
				</div>
				<div className="mb-3">
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
							className={`w-full pl-8 pr-2 py-1.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
								errors.password
									? "border-red-500"
									: "border-gray-300"
							}`}
							placeholder="Enter your password"
						/>
					</div>
					{errors.password && (
						<p className="text-red-500 text-xs mt-1">
							{errors.password}
						</p>
					)}
				</div>
				<div className="mb-5">
					<label
						className="block text-gray-700 text-xs font-bold mb-1"
						htmlFor="confirm-password"
					>
						Confirm Password
					</label>
					<div className="relative">
						<FaLock className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400" />
						<input
							type="password"
							id="confirm-password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={`w-full pl-8 pr-2 py-1.5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
								errors.confirmPassword
									? "border-red-500"
									: "border-gray-300"
							}`}
							placeholder="Confirm your password"
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
					className="w-full bg-blue-700 text-white py-1.5 px-3 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-200"
				>
					Sign Up
				</button>
				<div className="mt-4 text-center">
					<span className="text-gray-600 text-xs">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-500 hover:underline"
						>
							Login
						</Link>
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
