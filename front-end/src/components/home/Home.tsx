import { Link } from "react-router-dom";
import {
	FaSignInAlt,
	FaUserPlus,
	FaStickyNote,
	FaTags,
	FaSyncAlt,
	FaShareAlt,
} from "react-icons/fa";
import { useAuth } from "../../contexts/authContext";

const Home: React.FC = () => {
	const { loggedIn } = useAuth();
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 p-8">
			<div className=" bg-white bg-opacity-50 rounded-lg p-8 max-w-4xl mx-auto text-center shadow-lg">
				<div className="h-96 flex flex-col justify-center items-center">
					<img
						src="/logo-blue-notitle.png"
						alt="Logo"
						className="h-36 mx-auto mb-6 animate-bounce"
					/>
					<h1 className="text-5xl font-extrabold text-gray-900 mb-4">
						Welcome to{" "}
						<span className="font-logo text-blue-800">QUICKNOTES</span>
					</h1>
					<p className="text-gray-700 text-lg mb-8">
						Your ultimate note-taking app. Organize your thoughts, ideas, and
						tasks effortlessly.
					</p>
					{!loggedIn ? (
						<div className="flex justify-center space-x-4">
							<Link to="/login">
								<button className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-500 transition-all flex items-center space-x-2">
									<FaSignInAlt />
									<span>Login</span>
								</button>
							</Link>
							<Link to="/signup">
								<button className="bg-gray-700 text-white py-2 px-6 rounded-full shadow-md hover:bg-gray-600 transition-all flex items-center space-x-2">
									<FaUserPlus />
									<span>Sign Up</span>
								</button>
							</Link>
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
			<div className="mt-12 flex flex-wrap justify-around">
				<div className="bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 m-2 w-full md:w-5/12 transition-all">
					<h2 className="text-2xl font-bold text-gray-700 mb-2 flex items-center space-x-2">
						<FaStickyNote />
						<span>Create Notes</span>
					</h2>
					<p className="text-gray-600">
						Easily create notes to keep track of your thoughts and tasks.
					</p>
				</div>
				<div className="bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 m-2 w-full md:w-5/12 transition-all">
					<h2 className="text-2xl font-bold text-gray-700 mb-2 flex items-center space-x-2">
						<FaTags />
						<span>Organize</span>
					</h2>
					<p className="text-gray-600">
						Organize your notes by categories and tags for easy access.
					</p>
				</div>
				<div className="bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 m-2 w-full md:w-5/12 transition-all">
					<h2 className="text-2xl font-bold text-gray-700 mb-2 flex items-center space-x-2">
						<FaSyncAlt />
						<span>Sync</span>
					</h2>
					<p className="text-gray-600">
						Sync your notes across all your devices effortlessly.
					</p>
				</div>
				<div className="bg-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 m-2 w-full md:w-5/12 transition-all">
					<h2 className="text-2xl font-bold text-gray-700 mb-2 flex items-center space-x-2">
						<FaShareAlt />
						<span>Share</span>
					</h2>
					<p className="text-gray-600">
						Share your notes with others and collaborate in real-time.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
