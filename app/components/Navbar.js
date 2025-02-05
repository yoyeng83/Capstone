import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-yellow-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">🍛 Waifood</h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link href="/menu" className="hover:underline">Menu</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
