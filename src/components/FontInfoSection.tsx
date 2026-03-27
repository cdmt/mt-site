import Link from "next/link";
import font_styles from "@/app/styles/fonts.module.css";

type FontInfoSectionProps = {
    designerNames: string;
    description: string | null;
    designYear: string | null;
    glyphCount?: number;
    fileFormats: string[];
    supportedLanguages?: string;
    pdf?: string | null;
};

export default function FontInfoSection({
    designerNames,
    description,
    designYear,
    glyphCount,
    fileFormats,
    supportedLanguages,
    pdf,
}: FontInfoSectionProps) {
    return (
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
                        <p>{designYear || "Not available"}</p>
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
                </div>
                <div>
                    <div className={font_styles.font_info_inner_section}>
                        <p className={font_styles.font_info_inner_title}>Supported languages:</p>
                        <p>{supportedLanguages}</p>
                    </div>
                    <div className={font_styles.font_info_inner_section}>
                        <p className={font_styles.font_info_inner_title}>PDF:</p>
                        <Link href={pdf!} target="_blank">
                            <img src="/pdf.svg" className={font_styles.font_info_pdf} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
