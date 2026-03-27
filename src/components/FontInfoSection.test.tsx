import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import FontInfoSection from "./FontInfoSection";

const defaultProps = {
    designerNames: "Jane Doe",
    description: "A geometric sans with warm details",
    designYear: "2024",
    glyphCount: 512,
    fileFormats: ["OTF", "TTF", "WOFF2"],
    supportedLanguages: "English, Spanish",
    pdf: "/specimen.pdf",
};

describe("FontInfoSection", () => {
    it("renders key font metadata", () => {
        render(<FontInfoSection {...defaultProps} />);

        expect(screen.getByText("Designer:")).toBeInTheDocument();
        expect(screen.getByText("Jane Doe")).toBeInTheDocument();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("A geometric sans with warm details")).toBeInTheDocument();
        expect(screen.getByText("OTF, TTF, WOFF2")).toBeInTheDocument();
    });

    it("renders fallback when design year is missing", () => {
        render(<FontInfoSection {...defaultProps} designYear={null} />);

        expect(screen.getAllByText("Not available")[0]).toBeInTheDocument();
    });

    it("renders fallback when glyph count is missing", () => {
        render(<FontInfoSection {...defaultProps} glyphCount={undefined} />);

        expect(screen.getAllByText("Not available")[0]).toBeInTheDocument();
    });

    it("renders a PDF link when pdf is provided", () => {
        render(<FontInfoSection {...defaultProps} />);

        const pdfLink = screen.getByRole("link", { name: /download pdf specimen/i });
        expect(pdfLink).toHaveAttribute("href", "/specimen.pdf");
        expect(pdfLink).toHaveAttribute("target", "_blank");
    });

    it("shows PDF fallback and no link when pdf is missing", () => {
        render(<FontInfoSection {...defaultProps} pdf={null} />);

        expect(screen.getByText("PDF:")).toBeInTheDocument();
        expect(screen.getByText("Not available")).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /download pdf specimen/i })).not.toBeInTheDocument();
    });
});
