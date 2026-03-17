import styles from "./styles/page.module.css";
import globals from "./styles/global.module.css"
import { fetchGraphql } from "@/lib/graphql";
import { FontsQuery } from "../../operations-types";

async function getData() {
  return fetchGraphql<FontsQuery>("Fonts.graphql");
}

const data = await getData();
const fonts = data.viewer?.fontCollections?.edges?.map(edge => edge?.node).filter(Boolean) || [];

export default function Home() {
    return (
        <div className={globals.page}>
            <div className={styles.fonts}>
                {fonts.map(font => (
                    <div key={font?.id} className={styles.font}>
                        <a href="/">
                            <div>{font?.name}</div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
