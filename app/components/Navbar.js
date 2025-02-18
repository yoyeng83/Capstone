'use client';
import { useAuth } from './AuthContext'; // Import the Auth context to use authentication state
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            {/* Left side - Navigation links */}
            <div className="flex gap-4">
                <Link href="/" className="text-lg">Home</Link>
                <Link href="/menu" className="text-lg">Menu</Link>
                <Link href="/cart" className="text-lg">Cart</Link>
            </div>

            {/* Right side - User authentication buttons or profile */}
            <div className="flex items-center gap-4">
                {!user ? (
                    <>
                        <Link href="/login" className="text-lg border border-white px-4 py-2 rounded-md">Login</Link>
                        <Link href="/signup" className="text-lg border border-white px-4 py-2 rounded-md">Sign Up</Link>
                    </>
                ) : (
                    <>
                        {/* Display username and logout button */}
                        <span className="text-lg">Hello, {user.username}</span>
                        <button
                            onClick={logout}
                            className="text-lg border border-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-600"
                        >
                            Log Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
