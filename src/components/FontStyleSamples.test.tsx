import "@testing-library/jest-dom/jest-globals";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import FontStyleSamples from "./FontStyleSamples";

describe("FontStyleSamples", () => {
    it("returns null when styles is empty", () => {
        const { container } = render(<FontStyleSamples styles={[]} />);

        expect(container.firstChild).toBeNull();
    });

    it("renders one sample per style", () => {
        const styles = [
            { name: "Regular", cssFamily: "Acme", cssWeight: "400", cssStyle: null },
            { name: "Italic", cssFamily: "Acme", cssWeight: "400", cssStyle: "italic" },
        ] as never[];

        const { container } = render(<FontStyleSamples styles={styles} />);
        const samples = container.querySelectorAll(".style_sample");

        expect(samples).toHaveLength(2);
        expect(screen.getAllByText("Aa")).toHaveLength(2);
        expect(screen.getByText("Regular")).toBeInTheDocument();
        expect(screen.getByText("Italic")).toBeInTheDocument();
    });

    it("maps style data to rendered font style and defaults cssStyle to normal", () => {
        const styles = [
            { name: "Regular", cssFamily: "Acme", cssWeight: "400", cssStyle: null },
            { name: "Italic", cssFamily: "Acme", cssWeight: "700", cssStyle: "italic" },
        ] as never[];

        const { container } = render(<FontStyleSamples styles={styles} />);
        const samples = container.querySelectorAll(".style_sample");

        expect(samples).toHaveLength(2);

        const regularStyle = samples[0].getAttribute("style") || "";
        const italicStyle = samples[1].getAttribute("style") || "";

        expect(regularStyle).toContain("font-style: normal");
        expect(regularStyle).toContain("font-weight: 400");
        expect(italicStyle).toContain("font-style: italic");
        expect(italicStyle).toContain("font-weight: 700");
    });
});
