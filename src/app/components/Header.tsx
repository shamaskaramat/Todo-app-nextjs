"use client";

import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [user, setUser] = useState<any>(null);
    const [loadingImage, setLoadingImage] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-2 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Todo Management</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className={`w-10 h-10 rounded-full border-2 border-white ${loadingImage ? 'hidden' : 'block'
                                    }`}
                                onLoad={() => setLoadingImage(false)}
                                onError={() => setLoadingImage(false)}
                            />
                        ) : (
                            <FaUserCircle className="w-10 h-10 text-gray-300" />
                        )}
                        {loadingImage && (
                            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse absolute top-0 left-0" />
                        )}
                    </div>
                    <span className="font-semibold hidden sm:inline-block">
                        {user?.displayName || "Guest"}
                    </span>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center"
                        onClick={handleLogout}
                    >
                        <RiLogoutBoxRLine className="mr-2" />
                        <span className="hidden sm:inline-block">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;