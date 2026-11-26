import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import global_styles from "../../styles/global.module.css";
import info_styles from "../../styles/info.module.css";

export const metadata: Metadata = {
    title: "Cookie policy",
};

export default function CookiePolicyPage() {
    return (
        <div className={`${global_styles.info_page} ${info_styles.eula}`}>
            <section>
                <h3 className={info_styles.eula_header}>Cookie policy</h3>
                <p>Last updated: 26 November 2026</p>
                <p>
                    This policy explains how Moretype uses cookies and browser storage. For
                    information about other personal data, read our{" "}
                    <Link href="/info/privacy-notice">Privacy notice</Link>.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Your choice</h4>
                <p>
                    We ask before loading Google Analytics. You can choose to allow or reject
                    optional analytics. Your choice is saved in your browser&apos;s local storage
                    under <code>moretype-analytics-consent</code> so we can remember it. It remains
                    there until you clear your browser&apos;s site data.
                </p>
                <p>
                    You can change or withdraw your choice at any time using{" "}
                    <CookieSettingsLink className={info_styles.install_link} />. If you reject
                    analytics before allowing it, the Google
                    Analytics script is not loaded. If you withdraw after allowing it, we update
                    Google&apos;s consent state to deny analytics storage.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Analytics cookies</h4>
                <p>
                    If you allow analytics, we load Google Analytics to understand how visitors
                    use the site and help improve it. Google Analytics may set first-party
                    cookies, including <code>_ga</code> and a site-specific <code>_ga_*</code>{" "}
                    cookie, to distinguish browsers and maintain session information.
                </p>
                <p>
                    Google documents a default expiry of up to two years for these cookies.
                    Browser restrictions and the Google Analytics property settings may make
                    their actual lifetime shorter or different. Google receives analytics
                    information when the script runs. For details, see{" "}
                    <a href="https://support.google.com/analytics/answer/11397207?hl=en">
                        Google&apos;s information about Analytics cookies
                    </a>{" "}
                    and the{" "}
                    <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Other storage and technologies</h4>
                <p>
                    Fontdue provides account and store features on the site. Those features may
                    use their own storage technologies. The technologies used can depend on the
                    feature you choose, and any choices presented by Fontdue or a checkout
                    provider apply to those services.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Contact</h4>
                <p>
                    If you have questions about this policy, contact{" "}
                    <a href="mailto:info@moretype.co.uk">info@moretype.co.uk</a>.
                </p>
            </section>
        </div>
    );
}
