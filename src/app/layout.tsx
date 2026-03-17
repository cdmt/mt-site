import type { Metadata } from "next";
import "./globals.css";
import "fontdue-js/fontdue.css";
import FontdueProvider from "fontdue-js/FontdueProvider";
import StoreModal from "fontdue-js/StoreModal";

const fontdueUrl = process.env.NEXT_PUBLIC_FONTDUE_URL;


export const metadata: Metadata = {
    title: "Moretype",
    description: "Moretype type foundry",
};

    export default function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <body>
                
                <FontdueProvider url={fontdueUrl}>
                    {children}
                    <StoreModal />
                </FontdueProvider>
            </body>
        </html>
    );
}
