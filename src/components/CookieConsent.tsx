"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

const CONSENT_STORAGE_KEY = "moretype-analytics-consent";
const GA_MEASUREMENT_ID = "G-RSRRKH9C95";

type ConsentChoice = "accepted" | "rejected";
type Gtag = (...args: unknown[]) => void;

function getConsentSnapshot(): ConsentChoice | null {
    const savedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return savedChoice === "accepted" || savedChoice === "rejected" ? savedChoice : null;
}

function subscribeToConsent(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener("moretype:consent-change", callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("moretype:consent-change", callback);
    };
}

function getServerConsentSnapshot(): null {
    return null;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: Gtag;
    }
}

function enableAnalytics() {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args) => window.dataLayer!.push(args));
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);

    if (!document.querySelector("[data-moretype-analytics]")) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.dataset.moretypeAnalytics = "true";
        document.head.appendChild(script);
    }
}

export default function CookieConsent() {
    const choice = useSyncExternalStore(
        subscribeToConsent,
        getConsentSnapshot,
        getServerConsentSnapshot,
    );
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        const openPreferences = () => setShowPreferences(true);
        window.addEventListener("moretype:open-cookie-preferences", openPreferences);
        return () => window.removeEventListener("moretype:open-cookie-preferences", openPreferences);
    }, []);

    useEffect(() => {
        if (choice === "accepted") {
            enableAnalytics();
        } else if (choice === "rejected" && window.gtag) {
            window.gtag("consent", "update", { analytics_storage: "denied" });
        }
    }, [choice]);

    function saveChoice(nextChoice: ConsentChoice) {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
        window.dispatchEvent(new Event("moretype:consent-change"));
        setShowPreferences(false);
    }

    return (
        <>
            {choice === null || showPreferences ? (
                <aside id="cookie-settings" className={styles.banner} aria-label="Cookie preferences">
                    <div className={styles.copy}>
                        <h2>Help us improve Moretype</h2>
                        <p>
                            We use Google Analytics to understand how visitors use our site.
                            Analytics is optional and only runs if you allow it.
                        </p>
                        <p>
                            Read our <Link href="/info/cookie-policy">Cookie policy</Link> and{" "}
                            <Link href="/info/privacy-notice">Privacy notice</Link>.
                        </p>
                    </div>
                    <div className={styles.actions}>
                        <button
                            className={styles.secondaryButton}
                            onClick={() => saveChoice("rejected")}
                            type="button"
                        >
                            Reject optional
                        </button>
                        <button
                            className={styles.primaryButton}
                            onClick={() => saveChoice("accepted")}
                            type="button"
                        >
                            Allow analytics
                        </button>
                    </div>
                </aside>
            ) : null}
        </>
    );
}
