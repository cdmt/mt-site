import "@testing-library/jest-dom/jest-globals";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

let mockedPathname = "";

jest.mock("next/navigation", () => ({
    __esModule: true,
    usePathname: () => mockedPathname,
}));

const NavLink = require("./NavLink").default;

describe("NavLink", () => {
    beforeEach(() => {
        mockedPathname = "";
    });

    it("applies active class and aria-current when exact route matches", () => {
        mockedPathname = "/info";

        render(
            <NavLink href="/info" className="nav-link" activeClassName="active-link">
                Info
            </NavLink>
        );

        const link = screen.getByRole("link", { name: "Info" });
        expect(link).toHaveClass("nav-link");
        expect(link).toHaveClass("active-link");
        expect(link).toHaveAttribute("aria-current", "page");
    });

    it("does not apply active class on nested route when exact is true", () => {
        mockedPathname = "/info/eula";

        render(
            <NavLink href="/info" className="nav-link" activeClassName="active-link">
                Info
            </NavLink>
        );

        const link = screen.getByRole("link", { name: "Info" });
        expect(link).toHaveClass("nav-link");
        expect(link).not.toHaveClass("active-link");
        expect(link).not.toHaveAttribute("aria-current");
    });

    it("applies active class on nested route when exact is false", () => {
        mockedPathname = "/info/eula";

        render(
            <NavLink
                href="/info"
                className="nav-link"
                activeClassName="active-link"
                exact={false}
            >
                Info
            </NavLink>
        );

        const link = screen.getByRole("link", { name: "Info" });
        expect(link).toHaveClass("nav-link");
        expect(link).toHaveClass("active-link");
        expect(link).toHaveAttribute("aria-current", "page");
    });

    it("keeps link inactive for unrelated routes", () => {
        mockedPathname = "/contact";

        render(
            <NavLink
                href="/info"
                className="nav-link"
                activeClassName="active-link"
                exact={false}
            >
                Info
            </NavLink>
        );

        const link = screen.getByRole("link", { name: "Info" });
        expect(link).toHaveClass("nav-link");
        expect(link).not.toHaveClass("active-link");
        expect(link).not.toHaveAttribute("aria-current");
    });
});
