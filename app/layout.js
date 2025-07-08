import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./(components)/Footer";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { Toaster } from 'react-hot-toast'
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Radiant Metals Workshop | Custom Welding & Metal Fabrication",
  description:
    "Radiant Metals Workshop showcases expert welding, metal fabrication, and custom metalwork projects. Browse our portfolio for quality craftsmanship in steel, aluminum, and iron.",
  keywords: [
    "welding",
    "metal fabrication",
    "custom welding",
    "steel work",
    "metal art",
    "iron gates",
    "metal grills",
    "Radiant Metals Workshop",
    "Kenya welding services",
  ],
  openGraph: {
    title: "Radiant Metals Workshop",
    description:
      "Explore our custom welding and metal fabrication projects. From iron gates to structural frames, we deliver expert craftsmanship.",
    url: "https://radiantmetalsworkshop.com",
    siteName: "Radiant Metals Workshop",
    images: [
      {
        url: "https://radiantmetalsworkshop.com/logo-main.png", // Replace with your banner image
        width: 1200,
        height: 630,
        alt: "Radiant Metals Workshop Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Metals Workshop",
    description:
      "Portfolio of expert welding and metalwork services. View our past projects and contact us for your next build.",
    images: ["https://radiantmetalsworkshop.com/logo-main.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <Script
          id="structured-data-logo"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Radiant Metals Workshop",
              url: "https://radiantmetalsworkshop.com",
              logo: "https://radiantmetalsworkshop.com/main-logo.png",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <UserProvider>
         <CartProvider>
          {children}
          </CartProvider>
          </UserProvider>
      
       
        <Footer/>
      </body>
    </html>
  );
}
