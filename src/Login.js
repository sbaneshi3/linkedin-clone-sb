import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { login } from "./features/userSlice";

import "./Login.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [name, setName] = useState("");
	const dispatch = useDispatch();

	const loginToApp = (e) => {
		e.preventDefault();
		console.log("login to app");
		auth.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				console.log("login done");
				console.log(JSON.stringify(userAuth.user));
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.user.displayName,
						photoUrl: userAuth.user.photoURL,
					})
				);
			})
			.catch((error) => alert(error));
	};

	const register = () => {
		if (!name) {
			return alert("Please enter a full name!");
		}
		console.log("inside register ", email);
		console.log("inside register ", password);

		auth.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: name,
						photoURL: profilePic,
					})
					.then(() => {
						console.log("user created userAuth");
						console.log(JSON.stringify(userAuth.user));
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: userAuth.user.name,
								photoUrl: userAuth.user.photoUrl,
							})
						);
					});
			})
			.catch((error) => alert(error));
	};

	return (
		<div className="login">
			<img
				src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?"
				alt=""
			/>

			<form>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Full name (required if registering)"
					type="test"
				/>
				<input
					value={profilePic}
					onChange={(e) => setProfilePic(e.target.value)}
					placeholder="Profile pic URL (optional)"
					type="text"
				/>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					type="password"
				/>
				<button type="submit" onClick={loginToApp}>
					Sign In
				</button>
			</form>

			<p>
				Not a member?{" "}
				<span className="login__register" onClick={register}>
					Register Now
				</span>
			</p>
		</div>
	);
}
