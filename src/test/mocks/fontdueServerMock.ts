export class FontdueNotFoundError extends Error {}

export function createFontdueFetch() {
    return async () => {
        throw new Error("fontdue-js/server is mocked in tests");
    };
}
