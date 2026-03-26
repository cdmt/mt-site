import TypeTester from "fontdue-js/TypeTester";
import over_rides from "@/app/styles/over_rides.module.css";
import { standaloneTypeTesterConfig } from "./standaloneTypeTesterConfig";

type FontStyleLike = {
    name: string;
    cssFamily: string | null;
    cssWeight?: string | number | null;
};

type StandaloneTypeTestersProps = {
    slug: string;
    fontName: string;
    fontStyles: FontStyleLike[];
    sectionClassName?: string;
    fontSize?: number;
};

type AvailableFontStyle = FontStyleLike & { cssFamily: string };

function isAvailableStyle(
    style: FontStyleLike,
    includeItalic: boolean
): style is AvailableFontStyle {
    if (!style.cssFamily) {
        return false;
    }

    if (includeItalic) {
        return true;
    }

    return !style.name.toLowerCase().includes("italic");
}

function getPageSpecificTesterContent(slug: string, fontName: string) {
    const templates =
        standaloneTypeTesterConfig.copyBySlug[slug] ??
        standaloneTypeTesterConfig.defaultCopy;

    return templates.map((template) =>
        template.replaceAll("{fontName}", fontName)
    );
}

function parseCssWeight(cssWeight: string | number | null | undefined) {
    if (typeof cssWeight === "number") return cssWeight;
    if (typeof cssWeight === "string") {
        const parsed = parseInt(cssWeight, 10);
        return Number.isNaN(parsed) ? 400 : parsed;
    }
    return 400;
}

function sortByClosestWeight(styles: AvailableFontStyle[], targetWeight: number) {
    return [...styles].sort(
        (a, b) =>
            Math.abs(parseCssWeight(a.cssWeight) - targetWeight) -
            Math.abs(parseCssWeight(b.cssWeight) - targetWeight)
    );
}

function pickStylesByWeights(
    styles: FontStyleLike[],
    desiredWeights: number[],
    includeItalic: boolean,
    preferItalicPerBlock: boolean[]
): AvailableFontStyle[] {
    const candidates = styles.filter((style) =>
        isAvailableStyle(style, includeItalic)
    );

    const selected: AvailableFontStyle[] = [];
    const usedStyleNames = new Set<string>();

    for (const desiredWeight of desiredWeights) {
        const blockIndex = selected.length;
        const preferItalic = preferItalicPerBlock[blockIndex] ?? false;
        const bestMatch = sortByClosestWeight(
            candidates
                .filter((style) => !usedStyleNames.has(style.name))
                .sort(
                    (a, b) =>
                        (b.name.toLowerCase().includes("italic") === preferItalic ? 1 : 0) -
                        (a.name.toLowerCase().includes("italic") === preferItalic ? 1 : 0)
                ),
            desiredWeight
        )[0];

        if (!bestMatch) continue;
        selected.push(bestMatch);
        usedStyleNames.add(bestMatch.name);
    }

    return selected;
}

function getResolvedSettings(slug: string, fontName: string) {
    return {
        customTesterCopy: getPageSpecificTesterContent(slug, fontName),
        desiredWeights:
            standaloneTypeTesterConfig.desiredWeightsBySlug[slug] ??
            standaloneTypeTesterConfig.defaultWeights,
        includeItalic:
            standaloneTypeTesterConfig.includeItalicBySlug[slug] ??
            standaloneTypeTesterConfig.defaultIncludeItalic,
        preferItalicPerBlock:
            standaloneTypeTesterConfig.preferItalicBySlug[slug] ??
            standaloneTypeTesterConfig.defaultPreferItalic,
    };
}

export default function StandaloneTypeTesters({
    slug,
    fontName,
    fontStyles,
    sectionClassName,
    fontSize = 72,
}: StandaloneTypeTestersProps) {
    const {
        customTesterCopy,
        desiredWeights,
        includeItalic,
        preferItalicPerBlock,
    } =
        getResolvedSettings(slug, fontName);
    const weightedStyles = pickStylesByWeights(
        fontStyles,
        desiredWeights,
        includeItalic,
        preferItalicPerBlock
    );
    const weightedStyleNames = new Set(
        weightedStyles.map((weightedStyle) => weightedStyle.name)
    );
    const fallbackStyles = fontStyles
        .filter((style) => isAvailableStyle(style, includeItalic))
        .filter((style) => !weightedStyleNames.has(style.name));
    const sortedFallbackStyles = sortByClosestWeight(fallbackStyles, 500);
    const baseTesterStyles = [...weightedStyles, ...sortedFallbackStyles].slice(
        0,
        customTesterCopy.length
    );

    const testerStyles = [...baseTesterStyles];
    const repeatPool = testerStyles.length > 0 ? testerStyles : sortedFallbackStyles;

    while (testerStyles.length < customTesterCopy.length && repeatPool.length > 0) {
        testerStyles.push(repeatPool[testerStyles.length % repeatPool.length]);
    }

    if (testerStyles.length === 0) {
        return null;
    }

    return (
        <section className={sectionClassName}>
            {testerStyles.map((style, index) => (
                <div
                    key={`${style.name}-${index}`}
                    className={over_rides.locked_type_tester}
                    style={{ marginBottom: "1.5rem" }}
                >
                    <TypeTester
                        familyName={style.cssFamily}
                        styleName={style.name}
                        content={customTesterCopy[index]}
                        fontSize={fontSize}
                        autofit
                    />
                </div>
            ))}
        </section>
    );
}
