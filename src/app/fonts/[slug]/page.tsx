import { notFound } from "next/navigation";
import { fetchGraphql } from "@/lib/graphql";
import { FontsQuery } from "../../../../operations-types";
import CharacterViewer from "fontdue-js/CharacterViewer";
import TypeTesters from "fontdue-js/TypeTesters";
import FontStyle from "@/components/FontStyle";
import styles from "../../styles/global.module.css"

async function getData() {
    return fetchGraphql<FontsQuery>("Fonts.graphql");
}

export default async function FontPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getData();

    const font = data.viewer?.fontCollections?.edges
        ?.flatMap((edge) => (edge?.node ? [edge.node] : []))
        .find((item) => item.slug?.name === slug);

    if (!font) {
        notFound();
    }

    return (
        <div>
            <div>
                <FontStyle
                    familyName={font.featureStyle?.cssFamily}
                    styleName={font.featureStyle?.name}
                >
                    <h1>{font.name}</h1>
                </FontStyle>
            </div>
            <div className={styles.type_block}>
                <TypeTesters collectionId={font.id} />
            </div>
            <div className={styles.type_block}>
                <CharacterViewer collectionId={font.id} />
            </div>    
        </div>
    );
}