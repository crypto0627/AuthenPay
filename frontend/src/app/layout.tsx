import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { MeProvider } from "@/providers/Me";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Slab({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "600"
});

export const metadata: Metadata = {
  title: "AuthenPay",
  description: "The Next USDC Payment Wallet",
  manifest: "/manifest.json",
  icons: [
    {
      "url": '/logo-authenpay.png',
      "sizes": '192x192',
      "type": 'image/png'
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)"
        }}
      >
        <MeProvider>
          <div className="w-full h-full items-center justify-items-center min-h-screen sm:py-16 gap-16 font-[family-name:var(--font-geist-mono)]">
            <div className="w-full h-full max-w-[450px] sm:w-[400px] sm:h-[650px] rounded-[24px] flex justify-center glass overflow-y-scroll">
              {children}          
            </div>
          </div>
        </MeProvider>
      </body>
    </html>
  );
}
