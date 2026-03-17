import styles from "./styles/page.module.css";
import { fetchGraphql } from "@/lib/graphql";
import { FontsQuery } from "../../operations-types";

async function getData() {
  return fetchGraphql<FontsQuery>("Fonts.graphql");
}

const data = await getData();
const fonts = data.viewer?.fontCollections?.edges?.map(edge => edge?.node).filter(Boolean) || [];

export default function Home() {
    return (
        <div>
            <div className={styles.fonts}>
                {fonts.map(font => (
                    
                    <a href="/" key={font?.id} className={styles.font_block}>
                        <div className={styles.font_block_aa}>Aa</div>
                        <div>{font?.name}</div>
                    </a>
                ))}
            </div>
        </div>
    );
}
