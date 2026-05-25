import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "../context/AppState";
import Navbar from "../components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "FindMyCareer — AI-Powered Indian Student Career Guidance Portal",
  description: "Futuristic, AI-driven career advisor platform for Plus Two (Higher Secondary) students in India. Discover your passions, roadmaps, and salaries today.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-row">
        <AppStateProvider>
          {/* Main platform layout */}
          <Navbar />
          
          <div className="flex-1 min-h-screen flex flex-col w-full pl-0 md:pl-64 pb-20 md:pb-0 overflow-y-auto bg-mesh-radial cyber-grid">
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
              {children}
            </main>
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
