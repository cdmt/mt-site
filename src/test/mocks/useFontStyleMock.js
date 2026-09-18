// Plain CommonJS so tests can jest.spyOn the default export.
function useFontStyleMock() {
    return {
        loaded: false,
        style: {
            fontFamily: "Fallback",
            fontWeight: "normal",
            fontStyle: "normal",
        },
    };
}

module.exports = { __esModule: true, default: useFontStyleMock };
