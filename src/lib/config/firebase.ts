import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, type User } from 'firebase/auth';
import { writable } from 'svelte/store';

// Your Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyDts3EMG08C-kh0bdgkvcK7Zvc-MOTZ2Ns",
    authDomain: "grotik-app.firebaseapp.com",
    projectId: "grotik-app",
    storageBucket: "grotik-app.firebasestorage.app",
    messagingSenderId: "617083452553",
    appId: "1:617083452553:web:57c584f65feb80b0711a58"
};

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error: any) {
    if (error.code !== 'app/duplicate-app') {
        console.error('Firebase initialization error:', error);
        throw error;
    }
}

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
    display: 'popup'
});

// Create a user store
export const user = writable<User | null>(null);

// Subscribe to auth state changes
onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
});

export { auth, googleProvider, facebookProvider }; 