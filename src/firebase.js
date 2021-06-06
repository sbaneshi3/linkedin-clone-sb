import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyAK83v89NkRTT9NEyyYg8BQUvYz9oVquHs",
	authDomain: "linkedin-clone-sb.firebaseapp.com",
	projectId: "linkedin-clone-sb",
	storageBucket: "linkedin-clone-sb.appspot.com",
	messagingSenderId: "928174954734",
	appId: "1:928174954734:web:7df25f18a1e7752eb87bff",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
