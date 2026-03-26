export type StandaloneTypeTesterConfig = {
    copyBySlug: Record<string, string[]>;
    defaultCopy: string[];
    desiredWeightsBySlug: Record<string, number[]>;
    defaultWeights: number[];
    includeItalicBySlug: Record<string, boolean>;
    defaultIncludeItalic: boolean;
    preferItalicBySlug: Record<string, boolean[]>;
    defaultPreferItalic: boolean[];
};

// Use {fontName} as a placeholder inside copy strings.
export const standaloneTypeTesterConfig: StandaloneTypeTesterConfig = {
    copyBySlug: {
        "alber-new": [
            "Persist & Resist",
            "Super Hot & Heavy",
            "Mae dafad wedi bwyta fy brechdanau!",
        ],
        "alwyn-new": [
            "a stitch in time saves nine",
            "Mi volas brakumi tiun sciuron.",
            "Bang For The Buck",
        ],
        "alwyn-new-rounded": [
            "Baron Of Beef",
            "Rwy'n dy garu di",
            "Clean as a whistle.",
        ],
        bale: [
            "Love don't pay the rent",
            "Breakfast Lunch Tea",
            "50% rabat på udsalg"
        ],
        "bale-mono": [
            "if(type){moretype}",
            "jos tosi === tosi",
            "#ff000(255,0,0)Red",
        ],
        "depot-new": [
            "All shapes and sizes",
            "Pampering Treats & More",
            "Os gwelwch yn dda",
        ],
        "depot-new-condensed": [
            "Audit your Metrics",
            "Onde está a montaña rusa máis próxima?",
            "Sale now £19.75 --",
        ],
        "hedley-new": [
            "Let it Roll Baby",
            "Here we go again",
            "Ich bin auf der Bananenschale ausgerutscht.",
        ],
        "faricy-new": [
            "kolme pienta sanaa",
            "SMACK BANG WALLOP",
            "Dw i eisiau cofleidio'r wiwer yna.",
        ],
        hyla: [
            "Mouillé Na Sima Ya Matoyi",
            "Bad to the bone",
            "Gimme Gimme Gimme",
        ],
        "mic-32-new": [
            "Your Own Style",
            "Every Tom, Dick, And Harry",
            "Ag Léamh Acht na gCíréibe",
        ],
        "mic-32-new-rounded": [
            "90% statistic is 100% fabricated",
            "Pada deszcz kotów i psów",
            "On The Wagon",
        ],
        "mic-32-new-stencil": [
            "font_styles.page_section",
            "KISS Keep It Simple Stupid",
            "Włóż skarpetkę",
        ],
        rehn: [
            "Hard Work Works",
            "Una volta in una luna bluPassa el danè",
            "Now or Never",
        ],
        "rehn-condensed": [
            "Pikkiri lilin lebahnu tonji",
            "Be kind Be Brave Be happy",
            "O'u te fa'atau talo e mata tolu.",
        ],
        varly: [
            "Mothes hold there childrens hands for a short while but there hearts forever",
            "Only nice vibes",
            "Maw ia ki Krow",
        ],
    },
    defaultCopy: [
        "{fontName} in use: headlines, UI labels, and body text.",
        "Swap this copy per page slug to tailor the type test experience.",
    ],
    desiredWeightsBySlug: {
        "alber-new": [300, 700, 300],
        "alwyn-new": [300, 700, 400],
        "alwyn-new-rounded": [700, 300, 600],
        bale: [400, 700, 200],
        "bale-mono": [300, 700],
        "depot-new": [600, 300],
        "depot-new-condensed": [200, 700, 400],
        "hedley-new": [300, 700, 400],
        "faricy-new": [500, 300, 400],
        hyla: [400],
        "mic-32-new": [300, 700],
        "mic-32-new-rounded": [600, 700],
        "mic-32-new-stencil": [700, 300, 400],
        rehn: [200, 900, 400],
        "rehn-condensed": [900, 500, 200],
        varly: [400],
    },
    defaultWeights: [400, 700],
    includeItalicBySlug: {
        "alber-new": true,
        "alwyn-new-rounded": true,
        "bale": true,
        "faricy-new": true,
        "mic-32-new-stencil": true,
        "depot-new": true,
        "hedley-new": true,
        "mic-32-new": true
    },
    defaultIncludeItalic: false,
    preferItalicBySlug: {
        "alber-new": [false, false, true],
        "alwyn-new-rounded": [false, true, false],
        "bale": [false, false, true],
        "mic-32-new-stencil": [false, true, false],
        "depot-new": [false, true, false],
        "hedley-new": [true, false, false],
        "faricy-new": [false, false, true],
        "mic-32-new": [true, false, false]
    },
    defaultPreferItalic: [false, false],
};
