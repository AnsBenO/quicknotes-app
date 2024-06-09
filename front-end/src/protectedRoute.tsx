// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/authContext";

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
	const { loggedIn } = useAuth();
	return loggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
