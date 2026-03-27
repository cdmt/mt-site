import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchGraphql } from "@/lib/graphql";
import { FontQuery, FontQueryVariables } from "../../../../operations-types";
import CharacterViewer from "fontdue-js/CharacterViewer";
import TypeTesters from "fontdue-js/TypeTesters";
import FontStyle from "@/components/FontStyle";
import BuyButton from "fontdue-js/BuyButton";
import StandaloneTypeTesters from "@/components/StandaloneTypeTesters";
import FontInfoSection from "@/components/FontInfoSection";
import FontStyleSamples from "@/components/FontStyleSamples";
//
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
    const designerNames = font.designers?.map((designer) => designer.name).join(", ") || "Not available";
    const glyphCount = font.featureStyle?.glyphNames?.length;
    const description = font.description
    const fileFormats = [
        "OpenType",
        ...(font.featureStyle?.webfontSources
            ?.map((source) => source?.format)
            .filter((format): format is string => Boolean(format)) ?? []),
    ].filter((format, index, allFormats) => allFormats.indexOf(format) === index);
    const supportedLanguages = font.languages?.filter(Boolean).join(", ")
    const pdf = font?.pdfs![0]?.url
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
            <div className={font_styles.sticky_buy_button_wrap}>
                    <BuyButton
                        collectionId={font.id}
                    />
            </div>
            <section>
                <FontStyle
                    familyName={font.featureStyle?.cssFamily}
                    styleName={font.featureStyle?.name}
                >
                    <h2 className={font_styles.font_title}>{font.name}</h2>
                </FontStyle>
            </section>
            <section className={`${font_styles.style_list} ${font_styles.page_section}`}>
                <FontStyleSamples styles={regularStyles} />
                <FontStyleSamples styles={italicStyles} />
            </section>
            <section
                className={`${font_styles.page_section} ${font_styles.image_section_full_bleed}`}
                style={imageSectionStyle}
            >
                <div className={font_styles.image_section_inner}>
                    {image?.[0]?.url && (
                        <Image
                            src={image[0].url}
                            alt={image[0].description ?? ""}
                            width={image[0].meta?.width ?? 0}
                            height={image[0].meta?.height ?? 0}
                            style={{ width: "100%", height: "auto" }}
                        />
                    )}
                </div>
            </section>
            <section className={font_styles.page_section}>
                <TypeTesters collectionId={font.id} />
            </section>
            <FontInfoSection
                designerNames={designerNames}
                description={description}
                designYear={font.designYear}
                glyphCount={glyphCount}
                fileFormats={fileFormats}
                supportedLanguages={supportedLanguages}
                pdf={pdf}
            />
            <StandaloneTypeTesters
                slug={slug}
                fontName={font.name}
                fontStyles={font.fontStyles}
                sectionClassName={font_styles.page_section}
            />
            <section className={font_styles.page_section}>
                <CharacterViewer collectionId={font.id} />
            </section>    
        </div>
    );
}