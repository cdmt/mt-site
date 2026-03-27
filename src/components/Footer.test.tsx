import "@testing-library/jest-dom/jest-globals";
import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { FooterQuery } from "../../operations-types";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

import Footer from "./Footer";

describe("Footer", () => {
    it("renders fonts, pages, social link, and footer text", async () => {
        const data = {
            viewer: {
                fontCollections: {
                    edges: [
                        { node: { id: "font-1", name: "Acme Sans", slug: { name: "acme-sans" } } },
                        { node: { id: "font-2", name: "Fallback Family", slug: null } },
                    ],
                },
                pages: {
                    edges: [
                        { node: { id: "1", title: "Fonts", slug: { name: "fonts" } } },
                        { node: { id: "2", title: "Info", slug: { name: "info" } } },
                    ],
                },
                settings: {
                    footerText: "Copyright 2026 Moretype",
                },
            },
        } as unknown as FooterQuery;

        const ui = await Footer({ data });
        render(ui);

        expect(screen.getByRole("link", { name: /acme sans/i })).toHaveAttribute(
            "href",
            "/fonts/acme-sans"
        );
        expect(screen.getByRole("link", { name: /fallback family/i })).toHaveAttribute(
            "href",
            "/fonts"
        );

        expect(screen.getByRole("link", { name: /^fonts$/i })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: /^info$/i })).toHaveAttribute("href", "/info");

        const instagramLink = screen.getByRole("link", { name: /instagram logo/i });
        expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com/moretype/");
        expect(instagramLink).toHaveAttribute("target", "_blank");

        expect(screen.getByText("Copyright 2026 Moretype")).toBeInTheDocument();
    });

    it("handles empty data without crashing", async () => {
        const data = {
            viewer: {
                fontCollections: { edges: [] },
                pages: { edges: [] },
                settings: { footerText: null },
            },
        } as unknown as FooterQuery;

        const ui = await Footer({ data });
        const { container } = render(ui);

        expect(container.querySelector("footer")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /instagram logo/i })).toBeInTheDocument();
    });
});
