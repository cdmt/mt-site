import type { FontQuery } from "../../operations-types";
import FontStyle from "@/components/FontStyle";
import font_styles from "@/app/styles/fonts.module.css";

type FontPageStyle = NonNullable<
    NonNullable<NonNullable<FontQuery["viewer"]["slug"]>["fontCollection"]>["fontStyles"]
>[number];

interface FontStyleSamplesProps {
    styles: FontPageStyle[];
}

export default function FontStyleSamples({ styles }: FontStyleSamplesProps) {
    if (styles.length === 0) {
        return null;
    }

    return (
        <div className={font_styles.style_row}>
            {styles.map((style) => (
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
                        <p className={font_styles.weight_p}>{style.name}</p>
                    </div>
                </FontStyle>
            ))}
        </div>
    );
}