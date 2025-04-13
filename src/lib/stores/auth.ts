import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '$lib/config/firebase';
import { 
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';

// Create a writable store for the user
export const user = writable<User | null>(null);

// Subscribe to auth state changes
onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
});

// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { success: true, user: result.user };
    } catch (error) {
        console.error('Error signing in with Google:', error);
        return { success: false, error };
    }
};

// Sign in with Facebook
export const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        return { success: true, user: result.user };
    } catch (error) {
        console.error('Error signing in with Facebook:', error);
        return { success: false, error };
    }
};

// Sign out
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Error signing out:', error);
        return { success: false, error };
    }
}; 