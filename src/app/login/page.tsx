"use client";

import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoading(false);
            if (user) {
                setUser(user);
                router.push("/todos");
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome</h1>
                {user ? (
                    <div className="flex flex-col items-center">
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
                        />
                        <p className="text-xl font-semibold mb-4 text-gray-700">
                            {user.displayName}
                        </p>
                        <button
                            onClick={logOut}
                            className="flex items-center justify-center w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={signInWithGoogle}
                        className="flex items-center justify-center w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        <FaGoogle className="mr-2" />
                        Login with Google
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;