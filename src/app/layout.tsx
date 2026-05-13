import type { Metadata } from "next";
import "fontdue-js/fontdue.css";
import FontdueProvider from "fontdue-js/FontdueProvider";
import StoreModal from "fontdue-js/StoreModal";
import { fetchGraphql } from "@/lib/graphql";
import { RootLayoutQuery } from "../../operations-types";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import NavLink from "@/components/NavLink";
import CartButton from "fontdue-js/CartButton";
import type { CSSProperties } from "react";
//
import global_styles from "./styles/global.module.css";
import "./styles/globals.css";
import "./styles/over_rides.module.css";

const fontdueUrl = process.env.NEXT_PUBLIC_FONTDUE_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const gaMeasurementId = "G-RSRRKH9C95";

async function getData() {
  return fetchGraphql<RootLayoutQuery>("RootLayout.graphql");
}

export const metadata: Metadata = {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
        default: "Moretype",
        template: "%s | Moretype",
    },
    description: "Moretype type foundry",
    applicationName: "Moretype",
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: "website",
        title: "Moretype",
        description: "Moretype type foundry",
        siteName: "Moretype",
        url: "/",
    },
    twitter: {
        card: "summary",
        title: "Moretype",
        description: "Moretype type foundry",
    },
};

export default async function RootLayout({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    const { viewer } = await getData();
    const uiFontStyle = viewer.settings?.uiFontStyle;
    const uiFontFamily = uiFontStyle?.cssFamily && uiFontStyle?.name
        ? `${uiFontStyle.cssFamily} ${uiFontStyle.name}`
        : null;
    const uiFontWoff2Url = uiFontStyle?.webfontSources?.find(
        (source) => source?.format === "woff2" && source.url,
    )?.url;
    const uiFontCss = uiFontFamily && uiFontWoff2Url
        ? `@font-face { font-family: "${uiFontFamily}"; src: url(${uiFontWoff2Url}) format("woff2"); font-display: swap; }`
        : null;
    const bodyStyle = uiFontFamily
        ? ({ "--ui-font-family": `"${uiFontFamily}"` } as CSSProperties)
        : undefined;

    const pages = viewer.pages?.edges?.map((edge) => edge!.node!);   

    return (
        <html lang="en">
            <body style={bodyStyle}>
                {gaMeasurementId ? (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${gaMeasurementId}');
                                `,
                            }}
                        />
                    </>
                ) : null}
                {uiFontCss ? <style dangerouslySetInnerHTML={{ __html: uiFontCss }} /> : null}
                <div className={global_styles.page}>
                    <FontdueProvider url={fontdueUrl}>
                        <header className={global_styles.header}>
                            <Link href="/">
                                <Image
                                    src={viewer?.logo?.url!}
                                    alt="Logo"
                                    width={(viewer?.logo?.meta.width ?? 100) / 2}
                                    height={(viewer?.logo?.meta.height ?? 100) / 2}
                                    priority
                                />
                            </Link>
                            <nav className={global_styles.nav}>
                                <div>
                                    <ul className={global_styles.nav_site_links}>
                                        {pages?.map((page) => (
                                            <li key={page.slug?.name}>
                                                <NavLink
                                                    href={
                                                        page.slug?.name
                                                            ? page.slug.name === "fonts"
                                                                ? "/"
                                                                : `/${page.slug.name}`
                                                            : "/"
                                                    }
                                                    key={page.slug?.name}
                                                    className={global_styles.nav_link}
                                                    activeClassName={global_styles.nav_link_active}
                                                    exact={page.slug?.name === "fonts"}
                                                >
                                                    <span>{page.title}</span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <ul className={global_styles.nav_site_links}>
                                        <li>
                                            <NavLink
                                                href={"/customer-login"}
                                                className={global_styles.nav_link}
                                                activeClassName={global_styles.nav_link_active}
                                            >
                                                <span>Login</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <CartButton buttonStyle="icon" />
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </header>
                        <main className={global_styles.main}>{children}</main>
                        <StoreModal />
                        <Footer/>
                    </FontdueProvider>
                </div>  
            </body>
        </html>
    );
}
