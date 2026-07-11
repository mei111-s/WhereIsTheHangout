import { Baloo_2, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Liyag | Manila Date & Friend Spots",
  description: "Our little map of cute date and hangout spots around Manila.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="font-body text-cream">
        <header className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl font-bold text-cream tracking-tight">
              Liyag <span className="text-mango">♡</span>
            </Link>
            <Link
              href="/admin"
              className="font-mono text-xs uppercase tracking-wider text-cream/50 hover:text-mango transition-colors"
            >
              admin
            </Link>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-5 py-8">{children}</main>
        <footer className="max-w-5xl mx-auto px-5 py-10 text-center text-cream/30 text-sm font-mono">
          made with ♡ for the barkada
        </footer>
      </body>
    </html>
  );
}
