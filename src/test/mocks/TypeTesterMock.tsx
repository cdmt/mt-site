type TypeTesterMockProps = {
    familyName?: string | null;
    styleName?: string | null;
    content?: string;
    fontSize?: number;
    autofit?: boolean;
};

export default function TypeTesterMock({
    familyName,
    styleName,
    content,
    fontSize,
    autofit,
}: TypeTesterMockProps) {
    return (
        <div
            data-testid="type-tester"
            data-family-name={familyName ?? ""}
            data-style-name={styleName ?? ""}
            data-content={content ?? ""}
            data-font-size={fontSize ?? ""}
            data-autofit={autofit ? "true" : "false"}
        >
            {styleName}::{content}
        </div>
    );
}
