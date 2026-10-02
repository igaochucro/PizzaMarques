import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const requiredConfig = ["apiKey", "authDomain", "projectId", "messagingSenderId", "appId"];
export const isFirebaseConfigured = requiredConfig.every((key) => {
	const value = firebaseConfig[key];
	return typeof value === "string" && value.length > 0 && !value.includes("SEU_") && !value.startsWith("COLE_");
});

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
