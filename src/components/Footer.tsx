import globals from "@/app/styles/global.module.css";
import { fetchGraphql } from "@/lib/graphql";
import { FooterQuery } from "../../operations-types";
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

export default async function Footer() {

    return (
        <footer className={globals.footer}>
            <div className={footer_styles.footer_wrap}>
                <div className={footer_styles.footer_fonts}>
                    {fonts.map((font, index) => (
                        <Link href={font.slug?.name ? `/fonts/${font.slug.name}` : "/fonts"} key={font.slug?.name}>
                            {font.name} •{' '}
                        </Link>
                    ))}
                </div>
                <p>{viewer?.settings?.footerText}</p>
            </div>
        </footer>
    );
}