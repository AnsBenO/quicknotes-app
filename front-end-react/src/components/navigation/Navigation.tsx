// src/components/navigation/Navigation.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useAuthService } from "../../services/authService";

const Navigation: React.FC = () => {
	const { loggedIn, logout } = useAuth();
	const navigate = useNavigate();
	const { logoutUser } = useAuthService();

	const handleLogout = () => {
		logout();
		try {
			logoutUser();
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	const linkClassNames = ({ isActive }: { isActive: boolean }) =>
		`text-white px-4 py-2 rounded-md text-sm font-medium ${
			isActive ? "bg-gray-900" : "hover:bg-gray-700"
		}`;

	return (
		<nav className="bg-gray-800 p-2">
			<ul className="flex items-center justify-start space-x-4">
				<li className="self-start">
					<NavLink to="/">
						<img
							src="/logo-white-notitle.png"
							alt="Logo"
							className="h-10"
						/>
					</NavLink>
				</li>
				{loggedIn ? (
					<>
						<li>
							<NavLink
								to="/notes"
								className={linkClassNames}
							>
								Notes
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/create-note"
								className={linkClassNames}
							>
								Create Note
							</NavLink>
						</li>
						<li>
							<button
								onClick={handleLogout}
								className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
							>
								Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink
								to="/login"
								className={linkClassNames}
							>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/signup"
								className={linkClassNames}
							>
								Sign Up
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
