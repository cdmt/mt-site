import "@testing-library/jest-dom/jest-globals";
import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import HomeFontGrid from "./HomeFontGrid";
import type { HomePageQuery } from "../../operations-types";

jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

type FontNode = {
    id: string;
    name: string;
    isNew?: boolean | null;
    slug?: { name?: string | null } | null;
    fontStyles?: Array<{ id: string }> | null;
    featureStyle?: {
        cssFamily?: string | null;
        name?: string | null;
        family?: { colors?: Array<string | null> | null } | null;
    } | null;
};

function buildData(edges: Array<{ node: FontNode | null } | null>): HomePageQuery {
    return {
        viewer: {
            fontCollections: {
                edges,
            },
        },
    } as HomePageQuery;
}

function makeFont(overrides: Partial<FontNode> = {}): FontNode {
    return {
        id: "font-1",
        name: "Acme",
        isNew: false,
        slug: { name: "acme" },
        fontStyles: [{ id: "style-1" }, { id: "style-2" }],
        featureStyle: {
            cssFamily: "Acme",
            name: "Regular",
            family: { colors: ["#111111"] },
        },
        ...overrides,
    };
}

describe("HomeFontGrid", () => {
    it("renders no font cards when font collection edges are missing", () => {
        render(
            <HomeFontGrid
                data={
                    {
                        viewer: {
                            fontCollections: null,
                        },
                    } as HomePageQuery
                }
            />
        );

        expect(screen.queryAllByRole("link")).toHaveLength(0);
    });

    it("renders one card per valid node and ignores null edges or null nodes", () => {
        const data = buildData([
            { node: makeFont({ id: "font-1", name: "Acme" }) },
            null,
            { node: null },
            { node: makeFont({ id: "font-2", name: "Bento", slug: { name: "bento" } }) },
        ]);

        render(<HomeFontGrid data={data} />);

        expect(screen.getAllByRole("link")).toHaveLength(2);
        expect(screen.getByRole("link", { name: /Acme/i })).toHaveAttribute("href", "/fonts/acme");
        expect(screen.getByRole("link", { name: /Bento/i })).toHaveAttribute("href", "/fonts/bento");
    });

    it("uses fallback fonts href when slug is missing", () => {
        const data = buildData([{ node: makeFont({ slug: null }) }]);

        render(<HomeFontGrid data={data} />);

        expect(screen.getByRole("link", { name: /Acme/i })).toHaveAttribute("href", "/fonts");
    });

    it("shows new badge only when isNew is truthy", () => {
        const data = buildData([
            { node: makeFont({ id: "font-1", name: "Acme", isNew: true }) },
            { node: makeFont({ id: "font-2", name: "Bento", isNew: false, slug: { name: "bento" } }) },
        ]);

        render(<HomeFontGrid data={data} />);

        expect(screen.getAllByText("New")).toHaveLength(1);
    });

    it("updates preview names when typing in the override input", () => {
        const data = buildData([
            { node: makeFont({ id: "font-1", name: "Acme" }) },
            { node: makeFont({ id: "font-2", name: "Bento", slug: { name: "bento" } }) },
        ]);

        render(<HomeFontGrid data={data} />);

        fireEvent.change(screen.getByPlaceholderText("Type your type"), {
            target: { value: "Custom Preview" },
        });

        expect(screen.getAllByText("Custom Preview")).toHaveLength(2);
        expect(screen.queryByText("Acme")).not.toBeInTheDocument();
        expect(screen.queryByText("Bento")).not.toBeInTheDocument();
    });

    it("updates preview font size css variable when slider value changes", () => {
        const data = buildData([{ node: makeFont() }]);

        const { container } = render(<HomeFontGrid data={data} />);

        fireEvent.change(screen.getByRole("slider"), {
            target: { value: "48" },
        });

        const previewName = container.querySelector("div[style*='--preview-font-size']");
        expect(previewName).toBeInTheDocument();
        expect(previewName?.getAttribute("style")).toContain("--preview-font-size: 48px");
    });

    it("renders singular and plural style labels based on font style count", () => {
        const data = buildData([
            { node: makeFont({ id: "font-1", fontStyles: [{ id: "style-1" }] }) },
            {
                node: makeFont({
                    id: "font-2",
                    name: "Bento",
                    slug: { name: "bento" },
                    fontStyles: [{ id: "style-1" }, { id: "style-2" }, { id: "style-3" }],
                }),
            },
        ]);

        render(<HomeFontGrid data={data} />);

        expect(screen.getByText("1 style")).toBeInTheDocument();
        expect(screen.getByText("3 styles")).toBeInTheDocument();
    });
});
