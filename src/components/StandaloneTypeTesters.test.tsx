import "@testing-library/jest-dom/jest-globals";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import StandaloneTypeTesters from "./StandaloneTypeTesters";

describe("StandaloneTypeTesters", () => {
    it("returns null when there are no available styles", () => {
        const { container } = render(
            <StandaloneTypeTesters
                slug="unknown"
                fontName="Demo"
                fontStyles={[{ name: "Regular", cssFamily: null, cssWeight: 400 }]}
            />
        );

        expect(container.firstChild).toBeNull();
        expect(screen.queryByTestId("type-tester")).toBeNull();
    });

    it("uses default copy with {fontName} replacement", () => {
        render(
            <StandaloneTypeTesters
                slug="unknown"
                fontName="Demo Sans"
                fontStyles={[
                    { name: "Regular", cssFamily: "Demo Sans", cssWeight: 400 },
                    { name: "Bold", cssFamily: "Demo Sans", cssWeight: 700 },
                ]}
            />
        );

        expect(screen.getByText(/Regular::Demo Sans in use:/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Bold::Swap this copy per page slug to tailor the type test experience./i)
        ).toBeInTheDocument();

        const testers = screen.getAllByTestId("type-tester");
        expect(testers).toHaveLength(2);
        for (const tester of testers) {
            expect(tester).toHaveAttribute("data-font-size", "72");
            expect(tester).toHaveAttribute("data-autofit", "true");
        }
    });

    it("excludes italic styles by default", () => {
        render(
            <StandaloneTypeTesters
                slug="unknown"
                fontName="Demo"
                fontStyles={[
                    { name: "Regular", cssFamily: "Demo", cssWeight: 400 },
                    { name: "Italic", cssFamily: "Demo", cssWeight: 700 },
                    { name: "Bold", cssFamily: "Demo", cssWeight: 700 },
                ]}
            />
        );

        const selectedStyleNames = screen
            .getAllByTestId("type-tester")
            .map((node) => node.getAttribute("data-style-name"));
        expect(selectedStyleNames).not.toContain("Italic");
    });

    it("applies slug-specific italic preferences and custom font size", () => {
        render(
            <StandaloneTypeTesters
                slug="alber-new"
                fontName="Alber"
                fontSize={48}
                fontStyles={[
                    { name: "Light", cssFamily: "Alber", cssWeight: 300 },
                    { name: "Bold", cssFamily: "Alber", cssWeight: 700 },
                    { name: "Light Italic", cssFamily: "Alber", cssWeight: 300 },
                ]}
            />
        );

        const testers = screen.getAllByTestId("type-tester");
        expect(testers).toHaveLength(3);
        expect(testers[2]).toHaveAttribute("data-style-name", "Light Italic");
        for (const tester of testers) {
            expect(tester).toHaveAttribute("data-font-size", "48");
        }
    });

    it("repeats available styles to match configured copy length", () => {
        render(
            <StandaloneTypeTesters
                slug="alber-new"
                fontName="Alber"
                fontStyles={[{ name: "Regular", cssFamily: "Alber", cssWeight: 400 }]}
            />
        );

        const selectedStyleNames = screen
            .getAllByTestId("type-tester")
            .map((node) => node.getAttribute("data-style-name"));
        expect(selectedStyleNames).toEqual(["Regular", "Regular", "Regular"]);
    });
});
