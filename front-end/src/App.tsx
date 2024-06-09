import "./App.css";
import RoutesComponent from "./routes";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<header>
					<Navigation />
				</header>
				<RoutesComponent />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
