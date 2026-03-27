import "@testing-library/jest-dom/jest-globals";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";
import ReactDOM from "react-dom";

import PreloadWebfonts from "./PreloadWebfonts";

describe("PreloadWebfonts", () => {
    const preloadSpy = jest.spyOn(ReactDOM, "preload");

    beforeEach(() => {
        preloadSpy.mockReset();
    });

    it("returns null when style prop is null", () => {
        const { container } = render(<PreloadWebfonts style={null} />);

        expect(container.firstChild).toBeNull();
        expect(preloadSpy).not.toHaveBeenCalled();
    });

    it("calls ReactDOM.preload for woff2 source with a url", () => {
        const style = {
            cssFamily: "Acme",
            name: "Regular",
            webfontSources: [
                { format: "woff", url: "https://cdn.example.com/acme.woff" },
                { format: "woff2", url: "https://cdn.example.com/acme.woff2" },
            ],
        };

        const { container } = render(<PreloadWebfonts style={style} />);

        expect(preloadSpy).toHaveBeenCalledWith("https://cdn.example.com/acme.woff2", {
            as: "font",
        });

        const styleTag = container.querySelector("style");
        expect(styleTag).toBeInTheDocument();
        expect(styleTag?.innerHTML).toContain("@font-face");
        expect(styleTag?.innerHTML).toContain('font-family: "Acme Regular"');
        expect(styleTag?.innerHTML).toContain("url(https://cdn.example.com/acme.woff2)");
    });

    it("does not call preload when no woff2 source exists", () => {
        const style = {
            cssFamily: "Acme",
            name: "Regular",
            webfontSources: [{ format: "woff", url: "https://cdn.example.com/acme.woff" }],
        };

        const { container } = render(<PreloadWebfonts style={style} />);

        expect(preloadSpy).not.toHaveBeenCalled();
        const styleTag = container.querySelector("style");
        expect(styleTag).toBeInTheDocument();
        expect(styleTag?.innerHTML.trim()).toBe("");
    });

    it("does not call preload when woff2 format exists but url is missing", () => {
        const style = {
            cssFamily: "Acme",
            name: "Regular",
            webfontSources: [{ format: "woff2", url: null }],
        };

        const { container } = render(<PreloadWebfonts style={style} />);

        expect(preloadSpy).not.toHaveBeenCalled();
        const styleTag = container.querySelector("style");
        expect(styleTag).toBeInTheDocument();
        expect(styleTag?.innerHTML).toContain("url(null)");
    });

    it("uses the first matching woff2 source", () => {
        const style = {
            cssFamily: "Acme",
            name: "Regular",
            webfontSources: [
                { format: "woff2", url: "https://cdn.example.com/first.woff2" },
                { format: "woff2", url: "https://cdn.example.com/second.woff2" },
            ],
        };

        const { container } = render(<PreloadWebfonts style={style} />);

        expect(preloadSpy).toHaveBeenCalledWith("https://cdn.example.com/first.woff2", {
            as: "font",
        });
        const styleTag = container.querySelector("style");
        expect(styleTag?.innerHTML).toContain("url(https://cdn.example.com/first.woff2)");
        expect(styleTag?.innerHTML).not.toContain("url(https://cdn.example.com/second.woff2)");
    });
});
