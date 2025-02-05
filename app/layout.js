import "./globals.css";
import Navbar from "./components/Navbar"; // Import Navbar

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#fdf6e3] antialiased">
                <Navbar /> {/* Add Navbar here */}
                {children}
            </body>
        </html>
    );
}
