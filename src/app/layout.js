import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./custom-theme.css";
import Entete from "@/composants/Entete/Entete";
import PiedDePage from "@/composants/PiedDePage/PiedDePage";
import ReduxProvider from "./components/ReduxProvider";
import BootstrapClient from "@/composants/BootstrapClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio de Katia",
  description: "Portfolio professionnel de Katia, développeuse web full stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <BootstrapClient />
          <Entete />
          <main className="min-vh-100">
            {children}
          </main>
          <PiedDePage />
        </ReduxProvider>
      </body>
    </html>
  );
}
