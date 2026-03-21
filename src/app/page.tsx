import page_styles from "./styles/page.module.css";
import { fetchGraphql } from "@/lib/graphql";
import { FontsQuery } from "../../operations-types";
import Link from "next/link";
import FontStyle from "@/components/FontStyle";
import PreloadWebfonts from "@/components/PreloadWebfonts";

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
            <div className={page_styles.home_fonts}>
                {fonts.map((font) => (
                    <div key={font.id} className={page_styles.font_block}>
                        <PreloadWebfonts style={font.featureStyle} />
                        <Link
                            href={font.slug?.name ? `/fonts/${font.slug.name}` : "/fonts"}
                            className={page_styles.font_link}
                        >
                            <FontStyle
                                familyName={font.featureStyle?.cssFamily}
                                styleName={font.featureStyle?.name}
                            >
                                <div
                                    className={page_styles.font_block_aa}
                                    style={{ color: font.featureStyle?.family?.colors?.[0] ?? undefined }}
                                >
                                    Aa
                                </div>
                                <div className={page_styles.font_block_name}>{font.name}</div>
                            </FontStyle>
                            <div className={page_styles.font_block_styles}>
                                {font.fontStyles?.length ?? 0} {font.fontStyles?.length > 1 ? 'styles': 'style'}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
