import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchGraphql } from "@/lib/graphql";
import { FontQuery, FontQueryVariables } from "../../../../operations-types";
import CharacterViewer from "fontdue-js/CharacterViewer";
import TypeTesters from "fontdue-js/TypeTesters";
import FontStyle from "@/components/FontStyle";
import Link from "next/link";
import BuyButton from "fontdue-js/BuyButton";
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
    const supportedLanguages = font.languages
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
                {regularStyles.length > 0 && (
                    <div className={font_styles.style_row}>
                        {regularStyles.map((style) => (
                            <FontStyle
                                key={style.name}
                                familyName={style.cssFamily}
                                styleName={style.name}
                                fontWeight={style.cssWeight}
                                fontStyle={style.cssStyle ?? "normal"}
                                className={font_styles.style_sample}
                            >
                                <div className={font_styles.weight_aa}>
                                    <h3>Aa</h3>
                                    <p>{style.name}</p>
                                </div>
                            </FontStyle>
                        ))}
                    </div>
                )}
                {italicStyles.length > 0 && (
                    <div className={font_styles.style_row}>
                        {italicStyles.map((style) => (
                            <FontStyle
                                key={style.name}
                                familyName={style.cssFamily}
                                styleName={style.name}
                                fontWeight={style.cssWeight}
                                fontStyle={style.cssStyle ?? "normal"}
                                className={font_styles.style_sample}
                            >
                                <div className={font_styles.weight_aa}>
                                    <h3>Aa</h3>
                                    <p>{style.name}</p>
                                </div>
                            </FontStyle>
                        ))}
                    </div>
                )}
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
            <section className={`${font_styles.page_section} ${font_styles.font_info_full_bleed}`}>
                <div className={font_styles.font_info_inner}>
                    <div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>Designer:</p>
                            <p>{designerNames}</p>
                        </div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>Description:</p>
                            <p>{description}</p>
                        </div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>Year:</p>
                            <p>{font.designYear || "Not available"}</p>
                        </div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>Glyphs:</p>
                            <p>{glyphCount ?? "Not available"}</p>
                        </div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>Encoding:</p>
                            <p>Latin Extended</p>
                        </div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>File Formats:</p>
                            <p>{fileFormats.join(", ")}</p>
                        </div>
                        <div className={font_styles.font_info_inner_section}>
                            <p className={font_styles.font_info_inner_title}>PDF:</p>
                            <Link href={pdf!} target="_blank">
                                <img src="/pdf.svg" className={font_styles.font_info_pdf}/>
                            </Link>
                        </div>
                    </div>
                    <div>   
                        <div>
                            <p className={font_styles.font_info_inner_title}>Supported languages:</p>
                            <p>{supportedLanguages}</p>
                        </div>
                    </div>     
                
                </div>
            </section>
            <section className={font_styles.page_section}>
                <CharacterViewer collectionId={font.id} />
            </section>    
        </div>
    );
}