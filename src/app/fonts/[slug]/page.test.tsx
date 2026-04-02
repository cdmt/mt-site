import "@testing-library/jest-dom/jest-globals";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import type { FontQuery } from "../../../../operations-types";

const mockFetchGraphql = jest.fn<
    (queryName: string, variables?: unknown) => Promise<FontQuery>
>();
const mockNotFound = jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
});
const mockFontStyleSamples = jest.fn(({ styles }: { styles: Array<{ name: string }> }) => (
    <div data-testid="font-style-samples">{styles.map((style) => style.name).join(",")}</div>
));
const mockFontInfoSection = jest.fn(
    ({ designerNames, fileFormats, pdf }: { designerNames: string; fileFormats: string[]; pdf?: string }) => (
        <div data-testid="font-info-section">
            {designerNames}|{fileFormats.join(",")}|{pdf ?? "no-pdf"}
        </div>
    )
);
const mockStandaloneTypeTesters = jest.fn(({ slug }: { slug: string }) => (
    <div data-testid="standalone-type-testers">{slug}</div>
));

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

jest.mock("next/navigation", () => ({
    __esModule: true,
    notFound: () => mockNotFound(),
}));

jest.mock("@/lib/graphql", () => ({
    __esModule: true,
    fetchGraphql: (queryName: string, variables?: unknown) =>
        mockFetchGraphql(queryName, variables),
}));

jest.mock("@/components/FontStyle", () => ({
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/FontStyleSamples", () => ({
    __esModule: true,
    default: (props: { styles: Array<{ name: string }> }) => mockFontStyleSamples(props),
}));

jest.mock("@/components/FontInfoSection", () => ({
    __esModule: true,
    default: (props: { designerNames: string; fileFormats: string[]; pdf?: string }) =>
        mockFontInfoSection(props),
}));

jest.mock("@/components/StandaloneTypeTesters", () => ({
    __esModule: true,
    default: (props: { slug: string }) => mockStandaloneTypeTesters(props),
}));

jest.mock("fontdue-js/BuyButton", () => ({
    __esModule: true,
    default: ({ collectionId }: { collectionId: string }) => (
        <div data-testid="buy-button">{collectionId}</div>
    ),
}));

jest.mock("fontdue-js/TypeTesters", () => ({
    __esModule: true,
    default: ({ collectionId }: { collectionId: string }) => (
        <div data-testid="type-testers">{collectionId}</div>
    ),
}));

jest.mock("fontdue-js/CharacterViewer", () => ({
    __esModule: true,
    default: ({ collectionId }: { collectionId: string }) => (
        <div data-testid="character-viewer">{collectionId}</div>
    ),
}));

const FontPage = require("./page").default;

function buildFontQuery(): FontQuery {
    return {
        viewer: {
            slug: {
                fontCollection: {
                    id: "font-123",
                    name: "Acme Serif",
                    description: "A versatile editorial serif.",
                    designYear: "2024",
                    colors: ["#111111", "#eeeeee"],
                    designers: [{ name: "Chris" }, { name: "Pat" }],
                    languages: ["English", "French"],
                    pdfs: [{ url: "https://example.com/specimen.pdf" }],
                    images: [
                        {
                            url: "https://cdn.fontdue.com/specimen.png",
                            description: "Specimen image",
                            meta: { width: 1200, height: 800 },
                        },
                    ],
                    featureStyle: {
                        cssFamily: "Acme Serif",
                        name: "Regular",
                        glyphNames: ["A", "B", "C"],
                        webfontSources: [
                            { format: "woff2", url: "https://cdn.fontdue.com/acme.woff2" },
                            { format: "woff", url: "https://cdn.fontdue.com/acme.woff" },
                            { format: "woff2", url: "https://cdn.fontdue.com/acme-alt.woff2" },
                        ],
                    },
                    fontStyles: [
                        {
                            name: "Regular",
                            cssFamily: "Acme Serif",
                            cssWeight: "400",
                            cssStyle: null,
                        },
                        {
                            name: "Bold",
                            cssFamily: "Acme Serif",
                            cssWeight: "700",
                            cssStyle: null,
                        },
                        {
                            name: "Italic",
                            cssFamily: "Acme Serif",
                            cssWeight: "400",
                            cssStyle: "italic",
                        },
                    ],
                },
            },
        },
    } as unknown as FontQuery;
}

describe("FontPage", () => {
    beforeEach(() => {
        mockFetchGraphql.mockReset();
        mockNotFound.mockClear();
        mockFontStyleSamples.mockClear();
        mockFontInfoSection.mockClear();
        mockStandaloneTypeTesters.mockClear();
    });

    it("fetches the font by slug and renders derived page data", async () => {
        mockFetchGraphql.mockResolvedValue(buildFontQuery());

        const ui = await FontPage({ params: Promise.resolve({ slug: "acme-serif" }) });
        const { container } = render(ui);

        expect(mockFetchGraphql).toHaveBeenCalledWith("Fonts.graphql", { slug: "acme-serif" });
        expect(screen.getByRole("heading", { name: "Acme Serif" })).toBeInTheDocument();
        expect(screen.getByTestId("buy-button")).toHaveTextContent("font-123");
        expect(screen.getByTestId("type-testers")).toHaveTextContent("font-123");
        expect(screen.getByTestId("character-viewer")).toHaveTextContent("font-123");
        expect(screen.getByTestId("standalone-type-testers")).toHaveTextContent("acme-serif");

        expect(mockFontStyleSamples).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                styles: expect.arrayContaining([
                    expect.objectContaining({ name: "Regular" }),
                    expect.objectContaining({ name: "Bold" }),
                ]),
            })
        );
        expect(mockFontStyleSamples).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                styles: [expect.objectContaining({ name: "Italic" })],
            })
        );
        expect(mockFontInfoSection).toHaveBeenCalledWith(
            expect.objectContaining({
                designerNames: "Chris Pat",
                glyphCount: 3,
                fileFormats: ["otf", "woff2", "woff"],
                supportedLanguages: "English French",
                pdf: "https://example.com/specimen.pdf",
            })
        );

        const image = screen.getByAltText("Specimen image");
        expect(image).toHaveAttribute("src", "https://cdn.fontdue.com/specimen.png");

        const imageSection = container.querySelector(".image_section_full_bleed");
        expect(imageSection).toHaveStyle({
            background: "linear-gradient(135deg, #111111, #eeeeee)",
        });
        expect(mockNotFound).not.toHaveBeenCalled();
    });

    it("calls notFound when the font is missing", async () => {
        mockFetchGraphql.mockResolvedValue({
            viewer: {
                slug: {
                    fontCollection: null,
                },
            },
        } as FontQuery);

        await expect(
            FontPage({ params: Promise.resolve({ slug: "missing-font" }) })
        ).rejects.toThrow("NEXT_NOT_FOUND");

        expect(mockFetchGraphql).toHaveBeenCalledWith("Fonts.graphql", {
            slug: "missing-font",
        });
        expect(mockNotFound).toHaveBeenCalledTimes(1);
    });
});