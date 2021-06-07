import React, { useState, useEffect } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import EventNoteIcon from "@material-ui/icons/EventNote";
import FlipMove from "react-flip-move";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Feed() {
	const [posttext, setPosttext] = useState("");
	const [posts, setPosts] = useState([]);
	const user = useSelector(selectUser);

	useEffect(() => {
		const unsubscribe = db
			.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
		return () => {
			unsubscribe();
		};
	}, []);

	const typePost = (e) => {
		setPosttext(e.target.value);
	};

	const sendPost = (e) => {
		e.preventDefault();
		db.collection("posts").add({
			name: user.displayName,
			description: user.email,
			message: posttext,
			photoUrl: user.photoUrl || "",
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setPosttext("");
	};

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<CreateIcon />
					<form>
						<input
							type="text"
							value={posttext}
							onChange={typePost}
						/>
						<button type="submit" onClick={sendPost}>
							Send
						</button>
					</form>
				</div>
				<div className="feed__inputOptions">
					<InputOption
						Icon={ImageIcon}
						title={"Photo"}
						color="#70B5F9"
					/>
					<InputOption
						Icon={SubscriptionsIcon}
						title={"Video"}
						color="#E7A33E"
					/>
					<InputOption
						Icon={EventNoteIcon}
						title={"Event"}
						color="#C0CBCD"
					/>
					<InputOption
						Icon={CalendarViewDayIcon}
						title={"Write article"}
						color="#7FC15E"
					/>
				</div>
			</div>
			<FlipMove>
				{posts.map(
					({
						id,
						data: { name, description, message, photoUrl },
					}) => {
						return (
							<Post
								key={id}
								name={name}
								description={description}
								message={message}
								photoUrl={photoUrl}
							/>
						);
					}
				)}
			</FlipMove>
		</div>
	);
}

export default Feed;
