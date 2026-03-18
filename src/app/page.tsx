import styles from "./styles/page.module.css";
import { fetchGraphql } from "@/lib/graphql";
import { FontsQuery } from "../../operations-types";
import Link from "next/link";

async function getData() {
  return fetchGraphql<FontsQuery>("Fonts.graphql");
}

const data = await getData();
const fonts =
    data.viewer?.fontCollections?.edges?.flatMap(edge =>
        edge?.node ? [edge.node] : [],
    ) ?? [];

export default function Home() {
    return (
        <div>
            <div className={styles.fonts}>
                {fonts.map((font) => (
                    <Link
                        href={font.slug?.name ? `/fonts/${font.slug.name}` : "/fonts"}
                        key={font.id}
                        className={styles.font_block}
                    >
                        <div className={styles.font_block_aa}>Aa</div>
                        <div className={styles.font_block_name}>{font.name}</div>
                        <div>Styles</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
