import "@testing-library/jest-dom/jest-globals";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import type { RootLayoutQuery } from "../../operations-types";

const mockFetchGraphql = jest.fn<
    (queryName: string, variables?: unknown) => Promise<RootLayoutQuery>
>();

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ priority: _priority, ...props }: any) => <img {...props} />,
}));

jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

jest.mock("@/lib/graphql", () => ({
    __esModule: true,
    fetchGraphql: (queryName: string, variables?: unknown) =>
        mockFetchGraphql(queryName, variables),
}));

jest.mock("@/components/NavLink", () => ({
    __esModule: true,
    default: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

jest.mock("@/components/Footer", () => ({
    __esModule: true,
    default: () => <div data-testid="footer" />,
}));

jest.mock("fontdue-js/FontdueProvider", () => ({
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock("fontdue-js/StoreModal", () => ({
    __esModule: true,
    default: () => <div data-testid="store-modal" />,
}));

jest.mock("fontdue-js/CartButton", () => ({
    __esModule: true,
    default: () => <button type="button">Cart</button>,
}));

function buildRootLayoutQuery(): RootLayoutQuery {
    return {
        viewer: {
            fontCollections: null,
            logo: {
                url: "https://cdn.fontdue.com/logo.png",
                meta: {
                    width: 320,
                    height: 120,
                },
            },
            pages: {
                edges: [
                    {
                        node: {
                            id: "1",
                            title: "Fonts",
                            slug: { name: "fonts" },
                        },
                    },
                    {
                        node: {
                            id: "2",
                            title: "Info",
                            slug: { name: "info" },
                        },
                    },
                ],
            },
            settings: null,
        },
    };
}

describe("RootLayout", () => {
    beforeEach(() => {
        jest.resetModules();
        mockFetchGraphql.mockReset();
    });

    it("renders nav, children, and shell components using fetched layout data", async () => {
        mockFetchGraphql.mockResolvedValue(buildRootLayoutQuery());

        const RootLayout = require("./layout").default;
        const ui = await RootLayout({
            children: <div>Page body</div>,
        });
        render(ui);

        expect(mockFetchGraphql).toHaveBeenCalledWith("RootLayout.graphql", undefined);
        expect(screen.getByRole("img", { name: "Logo" })).toHaveAttribute(
            "src",
            "https://cdn.fontdue.com/logo.png"
        );
        expect(screen.getByRole("link", { name: "Fonts" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "Info" })).toHaveAttribute("href", "/info");
        expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
            "href",
            "/customer-login"
        );
        expect(screen.getByRole("button", { name: "Cart" })).toBeInTheDocument();
        expect(screen.getByText("Page body")).toBeInTheDocument();
        expect(screen.getByTestId("store-modal")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("renders safely when pages are empty", async () => {
        mockFetchGraphql.mockResolvedValue({
            viewer: {
                fontCollections: null,
                logo: {
                    url: "https://cdn.fontdue.com/logo.png",
                    meta: {
                        width: 320,
                        height: 120,
                    },
                },
                pages: {
                    edges: [],
                },
                settings: null,
            },
        });

        const RootLayout = require("./layout").default;
        const ui = await RootLayout({
            children: <div>Body</div>,
        });
        render(ui);

        expect(screen.getByText("Body")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "Fonts" })).not.toBeInTheDocument();
    });
});