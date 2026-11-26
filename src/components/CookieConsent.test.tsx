import "@testing-library/jest-dom/jest-globals";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import CookieConsent from "./CookieConsent";
import CookieSettingsLink from "./CookieSettingsLink";

describe("CookieConsent", () => {
    beforeEach(() => {
        window.localStorage.clear();
        delete window.dataLayer;
        delete window.gtag;
        document.querySelector("[data-moretype-analytics]")?.remove();
    });

    afterEach(() => {
        cleanup();
        delete window.dataLayer;
        delete window.gtag;
        document.querySelector("[data-moretype-analytics]")?.remove();
    });

    it("does not load analytics until the visitor allows it", async () => {
        render(<CookieConsent />);

        expect(await screen.findByRole("button", { name: "Allow analytics" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Cookie policy" })).toHaveAttribute(
            "href",
            "/info/cookie-policy",
        );
        expect(screen.getByRole("link", { name: "Privacy notice" })).toHaveAttribute(
            "href",
            "/info/privacy-notice",
        );
        expect(document.querySelector("[data-moretype-analytics]")).not.toBeInTheDocument();
        expect(window.localStorage.getItem("moretype-analytics-consent")).toBeNull();

        fireEvent.click(screen.getByRole("button", { name: "Reject optional" }));

        await waitFor(() => {
            expect(window.localStorage.getItem("moretype-analytics-consent")).toBe("rejected");
            expect(screen.queryByRole("button", { name: "Cookie settings" })).not.toBeInTheDocument();
        });
        expect(document.querySelector("[data-moretype-analytics]")).not.toBeInTheDocument();
    });

    it("loads analytics only after opt-in and supports withdrawing consent", async () => {
        render(<CookieConsent />);

        fireEvent.click(await screen.findByRole("button", { name: "Allow analytics" }));

        await waitFor(() => {
            expect(document.querySelector("[data-moretype-analytics]")).toHaveAttribute(
                "src",
                "https://www.googletagmanager.com/gtag/js?id=G-RSRRKH9C95",
            );
        });
        expect(window.dataLayer).toEqual([
            ["consent", "update", { analytics_storage: "granted" }],
            ["js", expect.any(Date)],
            ["config", "G-RSRRKH9C95"],
        ]);

        cleanup();
        render(
            <>
                <CookieConsent />
                <CookieSettingsLink />
            </>,
        );
        fireEvent.click(await screen.findByRole("link", { name: "Cookie settings" }));
        fireEvent.click(screen.getByRole("button", { name: "Reject optional" }));

        await waitFor(() => {
            expect(window.localStorage.getItem("moretype-analytics-consent")).toBe("rejected");
            expect(screen.queryByRole("button", { name: "Cookie settings" })).not.toBeInTheDocument();
        });
        expect(window.dataLayer).toContainEqual([
            "consent",
            "update",
            { analytics_storage: "denied" },
        ]);
    });

    it("restores a previously saved choice without showing the banner", async () => {
        window.localStorage.setItem("moretype-analytics-consent", "rejected");

        render(<CookieConsent />);

        await waitFor(() => {
            expect(screen.queryByRole("button", { name: "Allow analytics" })).not.toBeInTheDocument();
        });
        expect(screen.queryByRole("button", { name: "Cookie settings" })).not.toBeInTheDocument();
        expect(document.querySelector("[data-moretype-analytics]")).not.toBeInTheDocument();
    });

    it("opens preferences from the cookie policy link", async () => {
        window.localStorage.setItem("moretype-analytics-consent", "rejected");

        render(
            <>
                <CookieConsent />
                <CookieSettingsLink />
            </>,
        );

        fireEvent.click(await screen.findByRole("link", { name: "Cookie settings" }));

        expect(await screen.findByRole("button", { name: "Allow analytics" })).toBeInTheDocument();
    });

});
