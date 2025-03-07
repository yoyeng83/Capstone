import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#fdf6e3] antialiased">
                <AuthProvider> {/* Wrap app in AuthProvider */}
                    <CartProvider>
                        <Navbar />
                        {children}
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
