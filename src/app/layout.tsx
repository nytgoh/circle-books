import type {Metadata} from "next";
import "./globals.css";

import {Inknut_Antiqua} from 'next/font/google'
import {CartProvider} from "@/context/cart-context";

// If loading a variable font, you don't need to specify the font weight
const inknutAntiqua = Inknut_Antiqua({weight: "400", subsets: ['latin']})
export const metadata = {
    title: 'Circle Books',
    description: 'A site to browse and buy books',
    keywords: ['books', 'buy books', 'Circle Books', 'online bookstore'],
    icons: {
        icon: '/icon.ico',
    },
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${inknutAntiqua.className} antialiased bg-paleYellow`}
        >
        <CartProvider>{children}</CartProvider>
        </body>
        </html>
    );
}
