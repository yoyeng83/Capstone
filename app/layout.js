import "./globals.css";
import Navbar from "./components/Navbar"; // Import Navbar
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import { CartProvider } from "./components/CartContext"; // Import CartProvider

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-[#fdf6e3] antialiased">
                <AuthProvider> {/* Wrap with AuthProvider */}
                    <CartProvider> {/* Wrap with CartProvider */}
                        <Navbar />
                        {children}
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
