import type { Metadata } from "next";
import "fontdue-js/fontdue.css";
import FontdueProvider from "fontdue-js/FontdueProvider";
import StoreModal from "fontdue-js/StoreModal";
import { fetchGraphql } from "@/lib/graphql";
import { RootLayoutQuery } from "../../operations-types";
import Image from "next/image";
import globals from "./styles/global.module.css";
import Link from "next/link";
import "./styles/globals.css";
import Footer from "@/components/Footer";
import CustomerLoginForm from "fontdue-js/CustomerLoginForm";
import CartButton from "fontdue-js/CartButton";


const fontdueUrl = process.env.NEXT_PUBLIC_FONTDUE_URL;


async function getData() {
  return fetchGraphql<RootLayoutQuery>("RootLayout.graphql");
}

const { viewer } = await getData();
const pages =
    viewer?.pages?.edges?.flatMap(edge =>
        edge?.node ? [edge.node] : [],
    ) ?? [];    

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
                <div className={globals.page}>
                    <FontdueProvider url={fontdueUrl}>
                        <header className={globals.header}>
                            <Link href="/">
                                <Image
                                    src={viewer?.logo?.url!}
                                    alt="Logo"
                                    width={(viewer?.logo?.meta.width ?? 100) / 2}
                                    height={(viewer?.logo?.meta.height ?? 100) / 2}
                                    priority
                                />
                            </Link>
                            <nav className={globals.nav}>
                                <div>
                                    <ul className={globals.nav_site_links}>
                                        {pages?.map((page, index) => (
                                            <li key={page.slug?.name}>
                                                <Link
                                                    href={
                                                        page.slug?.name
                                                            ? page.slug.name === "fonts"
                                                                ? "/"
                                                                : `/${page.slug.name}`
                                                            : "/"
                                                    }
                                                    key={page.slug?.name}
                                                >
                                                    <span>{page.slug?.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <ul className={globals.nav_site_links}>
                                        <li>
                                            <Link href={"customer-login"}>
                                                <span>login</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <CartButton buttonStyle="icon" />
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </header>
                        <main className={globals.main}>{children}</main>
                        <StoreModal />
                        <Footer/>
                    </FontdueProvider>
                </div>  
            </body>
        </html>
    );
}
