// src/app/layout.tsx
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
// pages/_app.js (or in your main entry point)
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Todo App",
  description: "A simple Todo management app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>

        {children}

      </body>
    </html>
  );
};

export default RootLayout;  