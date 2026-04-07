"use client";

import { type CSSProperties, useState } from "react";
import Link from "next/link";
import FontStyle from "@/components/FontStyle";
import PreloadWebfonts from "@/components/PreloadWebfonts";
import page_styles from "@/app/styles/page.module.css";
import global_styles from "@/app/styles/global.module.css";
import type { HomePageQuery } from "../../operations-types";

export default function HomeFontGrid({
    data,
}: {
    data: HomePageQuery;
}) {
    const fonts =
        data.viewer?.fontCollections?.edges?.flatMap((edge) =>
            edge?.node ? [edge.node] : [],
        ) ?? [];

    const [nameOverride, setNameOverride] = useState("");
    const [displayFontSize, setDisplayFontSize] = useState(35)

    return (
        <>
            <div className={`${page_styles.name_input_wrap} ${global_styles.page_wrap}`}>
                <input
                    id="font-name-preview"
                    className={page_styles.name_input}
                    type="text"
                    value={nameOverride}
                    onChange={(event) => setNameOverride(event.target.value)}
                    placeholder="Type your type"
                />
                <input 
                    type="range" 
                    min={16} 
                    max={90} 
                    value={displayFontSize} 
                    onChange={(event) => setDisplayFontSize(Number(event.target.value))}
                    className={page_styles.size_slider}
                />

            </div>

            <div className={`${page_styles.home_fonts} ${global_styles.page_wrap}`}>
                {fonts.map((font) => (
                    <div className={page_styles.font_block} key={font.id}>
                        {Boolean(font.isNew) && <span className={page_styles.new_badge}>New</span>}
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
                                    style={{
                                        color: font.featureStyle?.family?.colors?.[0] ?? undefined,
                                        opacity: 0.9,
                                    }}
                                >
                                    Aa
                                </div>
                                <div
                                    className={page_styles.font_block_name}
                                    style={{
                                        "--preview-font-size": `${displayFontSize}px`,
                                    } as CSSProperties}
                                >
                                    {nameOverride || font.name}
                                </div>
                            </FontStyle>
                            <div className={page_styles.font_block_styles}>
                                {font.fontStyles?.length ?? 0} {font.fontStyles?.length > 1 ? "styles" : "style"}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}