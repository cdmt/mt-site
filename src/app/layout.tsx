import type { Metadata } from "next";
import "fontdue-js/fontdue.css";
import FontdueProvider from "fontdue-js/FontdueProvider";
import StoreModal from "fontdue-js/StoreModal";
import { fetchGraphql } from "@/lib/graphql";
import { RootLayoutQuery } from "../../operations-types";
import Image from "next/image";


const fontdueUrl = process.env.NEXT_PUBLIC_FONTDUE_URL;


async function getData() {
  return fetchGraphql<RootLayoutQuery>("RootLayout.graphql");
}

export const metadata: Metadata = {
    title: "Moretype",
    description: "Moretype type foundry",
};

export default async function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    const { viewer } = await getData();

    const pages = viewer.pages?.edges?.map((edge) => edge!.node!);   

    return (
        <html lang="en">
            <body>
                <FontdueProvider url={fontdueUrl}>
                    <nav>
                        <Image
                            src={viewer?.logo?.url!}
                            alt="Logo"
                            width={(viewer?.logo?.meta.width ?? 100) / 2}
                            height={(viewer?.logo?.meta.height ?? 100) / 2}
                            priority
                        />
                    </nav>
                    {children}
                    <StoreModal />
                </FontdueProvider>
            </body>
        </html>
    );
}
