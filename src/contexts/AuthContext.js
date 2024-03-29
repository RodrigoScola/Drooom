import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useFireship } from "../hooks/useFireship";
import { useMusic } from "../hooks/useMusic";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const { createPost } = useFireship();
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
