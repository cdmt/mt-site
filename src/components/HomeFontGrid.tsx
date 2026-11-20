"use client";

import { type CSSProperties, useRef, useState } from "react";
import Link from "next/link";
import FontStyle from "@/components/FontStyle";
import PreloadWebfonts from "@/components/PreloadWebfonts";
import page_styles from "@/app/styles/page.module.css";
import global_styles from "@/app/styles/global.module.css";
import { pangrams } from "@/lib/pangrams";
import type { HomePageQuery } from "../../operations-types";

export default function HomeFontGrid({
    data,
    pangram = pangrams[0],
}: {
    data: HomePageQuery;
    pangram?: string;
}) {
    const fonts =
        data.viewer?.fontCollections?.edges?.flatMap((edge) =>
            edge?.node ? [edge.node] : [],
        ) ?? [];

    const [nameOverride, setNameOverride] = useState("");
    const [displayFontSize, setDisplayFontSize] = useState(35);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const handleSliderInteractionStart = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        nameInputRef.current?.blur();
    };

    return (
        <>
            <div className={`${page_styles.name_input_wrap} ${global_styles.page_wrap}`}>
                <div className={page_styles.name_input_control}>
                    <label htmlFor="select" className={page_styles.input_label}>Select Text</label>
                    <select
                        name="select"
                        id="select"
                        className={page_styles.select_input}
                        onChange={(event) => setNameOverride(event.target.value)}
                    >
                        <option value="">Font Name</option>
                        <option value="ABCDEFGHIJKLMNOPQRSTUVWXYZ">ABCDEFGHIJKLMNOPQRSTUVWXYZ</option>
                        <option value="abcdefghijklmnopqrstuvwxyz">abcdefghijklmnopqrstuvwxyz</option>
                        <option value="0123456789">0123456789</option>
                        <option value={pangram}>{pangram}</option>
                        <option value="abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ">abc def ghi jkl mno pqrs tuv wxyz ABC DEF GHI JKL MNO PQRS TUV WXYZ !&quot;§ $%&</option>
                        <option value="A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</option>
                    </select>
                </div>
                <div className={page_styles.name_input_control}>
                    <label htmlFor="input" className={page_styles.input_label}>Input Text</label>
                    <input
                        name="input"
                        ref={nameInputRef}
                        id="input"
                        className={page_styles.name_input}
                        type="text"
                        value={nameOverride}
                        onChange={(event) => setNameOverride(event.target.value)}
                        placeholder="Type your type"
                    />
                </div>
                <div className={`${page_styles.name_input_control} ${page_styles.size_slider_control}`}>
                    <label htmlFor="size" className={page_styles.input_label}>Text Size</label>
                    <input
                        name="size"
                        id="size"
                        type="range"
                        min={16}
                        max={200}
                        value={displayFontSize}
                        onTouchStart={handleSliderInteractionStart}
                        onMouseDown={handleSliderInteractionStart}
                        onChange={(event) => setDisplayFontSize(Number(event.target.value))}
                        className={page_styles.size_slider}
                    />
                </div>
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