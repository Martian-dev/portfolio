"use server"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, } from "firebase/database";

// Your web app's Firebase configuration
// import firebaseConfig from '../dat.json' assert { type: 'json' };
// const dat = await fetch('../../src/dat.json');
// const firebaseConfig = await dat.json();

const firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesRef = ref(database, "messages");


export default async function sendEmail(formData: FormData) {

	const rawData = {
		name: formData.get('name'),
		email: formData.get('email'),
		message: formData.get('message'),
	}

	const newMessagesRef = push(messagesRef);
	set(newMessagesRef, rawData);

}
