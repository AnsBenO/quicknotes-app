// src/routes.tsx
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "./components/common/Loader/Loader";

const Login = lazy(() => import("./components/auth/Login"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const NoteList = lazy(() => import("./components/notes/NoteList"));
const NoteDetail = lazy(() => import("./components/notes/NoteDetail"));
const NoteForm = lazy(() => import("./components/notes/NoteForm"));
const Home = lazy(() => import("./components/home/Home"));

const RoutesComponent: React.FC = () => (
	<main className="relative">
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>

				<Route
					path="/notes"
					element={<ProtectedRoute element={<NoteList />} />}
				/>
				<Route
					path="/notes/:id"
					element={<ProtectedRoute element={<NoteDetail />} />}
				/>
				<Route
					path="/create-note"
					element={<ProtectedRoute element={<NoteForm />} />}
				/>
			</Routes>
		</Suspense>
	</main>
);

export default RoutesComponent;
