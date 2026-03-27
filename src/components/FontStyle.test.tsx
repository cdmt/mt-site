import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import * as useFontStyleModule from "fontdue-js/useFontStyle";

import FontStyle from "./FontStyle";

describe("FontStyle", () => {
    const useFontStyleSpy = jest.spyOn(useFontStyleModule, "default");

    beforeEach(() => {
        useFontStyleSpy.mockReset();
    });

    it("renders children and passes span props", () => {
        useFontStyleSpy.mockReturnValue({
            loaded: true,
            style: {
                fontFamily: "Mock Family",
                fontWeight: "400",
                fontStyle: "normal",
            },
        });

        render(
            <FontStyle
                familyName="Acme"
                styleName="Regular"
                className="font-style"
                data-testid="font-style"
            >
                Hello style
            </FontStyle>
        );

        const span = screen.getByTestId("font-style");
        expect(span).toBeTruthy();
        expect(span.className).toContain("font-style");
        expect(screen.getByText("Hello style")).toBeTruthy();
    });

    it("calls useFontStyle with defaults when optional props are missing", () => {
        useFontStyleSpy.mockReturnValue({
            loaded: true,
            style: {
                fontFamily: "Mock Family",
                fontWeight: "350",
                fontStyle: "italic",
            },
        });

        render(
            <FontStyle familyName="Acme" styleName="Regular">
                Defaults
            </FontStyle>
        );

        expect(useFontStyleSpy).toHaveBeenCalledWith({
            fontFamily: "Acme Regular",
            fontWeight: "400",
            fontStyle: "normal",
        });
    });

    it("converts numeric fontWeight to string for hook call", () => {
        useFontStyleSpy.mockReturnValue({
            loaded: true,
            style: {
                fontFamily: "Mock Family",
                fontWeight: "400",
                fontStyle: "normal",
            },
        });

        render(
            <FontStyle familyName="Acme" styleName="Bold" fontWeight={700}>
                Numeric
            </FontStyle>
        );

        expect(useFontStyleSpy).toHaveBeenCalledWith({
            fontFamily: "Acme Bold",
            fontWeight: "700",
            fontStyle: "normal",
        });
    });

    it("applies style precedence: hook < explicit props < style prop", () => {
        useFontStyleSpy.mockReturnValue({
            loaded: true,
            style: {
                fontFamily: "Mock Family",
                fontWeight: "300",
                fontStyle: "normal",
                letterSpacing: "0.01em",
            },
        });

        render(
            <FontStyle
                familyName="Acme"
                styleName="Regular"
                fontWeight={600}
                fontStyle="italic"
                style={{ fontWeight: 900, color: "red" }}
                data-testid="font-style"
            >
                Merge
            </FontStyle>
        );

        const span = screen.getByTestId("font-style");
        const inlineStyle = span.getAttribute("style") || "";

        expect(inlineStyle).toContain("font-family: Mock Family");
        expect(inlineStyle).toContain("font-style: italic");
        expect(inlineStyle).toContain("font-weight: 900");
        expect(inlineStyle).toContain("color: red");
        expect(inlineStyle).toContain("letter-spacing: 0.01em");
    });

    it("renders when family/style names are nullish", () => {
        useFontStyleSpy.mockReturnValue({
            loaded: true,
            style: {
                fontFamily: "Fallback",
                fontWeight: "400",
                fontStyle: "normal",
            },
        });

        render(
            <FontStyle familyName={null} styleName={undefined} data-testid="font-style">
                Nullish names
            </FontStyle>
        );

        const span = screen.getByTestId("font-style");
        expect(span).toBeTruthy();
        expect(screen.getByText("Nullish names")).toBeTruthy();
        expect(useFontStyleSpy).toHaveBeenCalledWith({
            fontFamily: "null undefined",
            fontWeight: "400",
            fontStyle: "normal",
        });
    });
});
