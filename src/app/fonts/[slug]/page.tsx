import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchGraphql } from "@/lib/graphql";
import { FontQuery, FontQueryVariables } from "../../../../operations-types";
import CharacterViewer from "fontdue-js/CharacterViewer";
import TypeTesters from "fontdue-js/TypeTesters";
import FontStyle from "@/components/FontStyle";
import styles from "../../styles/global.module.css"
import font_styles from "../../styles/fonts.module.css"

async function getData(slug: string) {
    return fetchGraphql<FontQuery, FontQueryVariables>("Fonts.graphql", { slug });
}

export default async function FontPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getData(slug);

    const font = data.viewer?.slug?.fontCollection;
    const image = data.viewer.slug?.fontCollection?.images

    if (!font) {
        notFound();
    }

    const regularStyles = font.fontStyles.filter(
        (style) => !style.name.toLowerCase().includes("italic")
    );
    const italicStyles = font.fontStyles.filter((style) =>
        style.name.toLowerCase().includes("italic")
    );
    const styleRows = [regularStyles, italicStyles].filter(
        (row) => row.length > 0
    );

    const imageSectionStyle = font.colors?.length
        ? {
              background:
                  font.colors.length === 1
                      ? font.colors[0]
                      : `linear-gradient(135deg, ${font.colors.join(", ")})`,
          }
        : undefined;

    return (
        <div className={font_styles.page_wrap}>
            <section className={font_styles.page_section}>
                <FontStyle
                    familyName={font.featureStyle?.cssFamily}
                    styleName={font.featureStyle?.name}
                >
                    <h1>{font.name}</h1>
                </FontStyle>
            </section>
            <section className={`${font_styles.style_list} ${font_styles.page_section}`}>
                {styleRows.map((row, index) => (
                    <div key={index} className={font_styles.style_row}>
                        {row.map((style) => (
                            <FontStyle
                                key={style.name}
                                familyName={style.cssFamily}
                                styleName={style.name}
                                className={font_styles.style_sample}
                            >
                                <div className={font_styles.weight_aa}>
                                    <h3>Aa</h3>
                                    <p>{style.name}</p>
                                </div>
                            </FontStyle>
                        ))}
                    </div>
                ))}
            </section>
            <section className={font_styles.page_section} style={imageSectionStyle}>
                {image?.[0]?.url && (
                    <Image
                        src={image[0].url}
                        alt={image[0].description ?? ""}
                        width={image[0].meta?.width ?? 0}
                        height={image[0].meta?.height ?? 0}
                        style={{ width: "100%", height: "auto" }}
                    />
                )}
            </section>
            <section  className={font_styles.page_section}>
                <TypeTesters collectionId={font.id} />
            </section>
            <section  className={font_styles.page_section}>
                <CharacterViewer collectionId={font.id} />
            </section>    
        </div>
    );
}