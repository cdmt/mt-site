import globals from "@/app/styles/global.module.css";
import { fetchGraphql } from "@/lib/graphql";
import { FooterQuery } from "../../operations-types";
import Image from "next/image";
import Link from "next/link";
import footer_styles from '../app/styles/footer.module.css'

async function getData() {
    return fetchGraphql<FooterQuery>("Footer.graphql");
}

const { viewer } = await getData();
const fonts =
    viewer?.fontCollections?.edges?.flatMap(edge =>
        edge?.node ? [edge.node] : [],
    ) ?? [];
const pages =
    viewer?.pages?.edges?.flatMap(edge =>
        edge?.node ? [edge.node] : [],
    ) ?? [];    

export default async function Footer() {

    return (
        <footer className={globals.footer}>
            <div className={footer_styles.footer_wrap}>
                <div className={footer_styles.footer_fonts}>
                    {fonts.map((font) => (
                        <Link href={font.slug?.name ? `/fonts/${font.slug.name}` : "/fonts"} key={font.slug?.name}>
                            {font.name} •{' '}
                        </Link>
                    ))}
                </div>
                <div className={footer_styles.footer_pages}>
                    {pages.map((page) => (
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
                            <p>{page.slug?.name}</p>
                        </Link>
                    ))}
                </div>
                <div className={footer_styles.footer_links}>
                    <Link href="https://www.instagram.com/moretype/" target="_blank">
                        <Image src="/instagram.png" alt="instagram logo" width={24} height={24} />
                    </Link>
                </div>
            </div>
            <p className={footer_styles.footer_copyright}>{viewer?.settings?.footerText}</p>
        </footer>
    );
}