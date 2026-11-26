import type { Metadata } from "next";
import Link from "next/link";
import global_styles from "../../styles/global.module.css";
import info_styles from "../../styles/info.module.css";

export const metadata: Metadata = {
    title: "Privacy notice",
};

export default function PrivacyNoticePage() {
    return (
        <div className={`${global_styles.info_page} ${info_styles.eula}`}>
            <section>
                <h3 className={info_styles.eula_header}>Privacy notice</h3>
                <p>Last updated: 26 November 2026</p>
                <p>
                    Moretype Ltd (&quot;Moretype&quot;, &quot;we&quot;, &quot;us&quot; or
                    &quot;our&quot;) operates the Moretype website. This notice explains what
                    personal information we handle, why we use it, and the choices and rights
                    available to you.
                </p>
                <p>
                    For privacy questions or requests, contact{" "}
                    <a href="mailto:info@moretype.co.uk">info@moretype.co.uk</a>.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Information we use</h4>
                <ul>
                    <li>
                        If you contact us through the website, we receive the name, email address
                        and message you submit.
                    </li>
                    <li>
                        Fontdue provides features used for fonts, accounts and the store. If you
                        use those features, information needed to provide them may be processed by
                        Fontdue and any payment service used during checkout.
                    </li>
                    <li>
                        If you allow analytics, Google Analytics receives information about use of
                        the website, such as pages viewed and browser or device details. See our{" "}
                        <Link href="/info/cookie-policy">Cookie policy</Link>.
                    </li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>How and why we use it</h4>
                <ul>
                    <li>
                        We use contact details and messages to respond to enquiries and provide
                        support.
                    </li>
                    <li>
                        We and our service providers use account and transaction information to
                        provide requested store services, manage licences and meet applicable
                        legal obligations.
                    </li>
                    <li>
                        We use Google Analytics only if you choose to allow it, to understand
                        website usage and improve the site. You can change your choice using{" "}
                        the Cookie settings button shown on the site.
                    </li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Service providers</h4>
                <p>
                    We use Fontdue for site, account and store features; Google Analytics for
                    optional website analytics; and an email delivery service to receive contact
                    form submissions. These providers may process information on our behalf or
                    under their own privacy terms when you use their services. Information may
                    also be disclosed where required by law.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>How long we keep information</h4>
                <p>
                    We keep personal information only for as long as it is needed for the purpose
                    it was collected, including responding to enquiries, providing services and
                    meeting legal or accounting requirements. When it is no longer needed, we
                    delete it or remove identifying details.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>Your rights</h4>
                <p>
                    Depending on the circumstances, UK data protection law gives you rights to
                    access, correct or erase personal information, restrict or object to some
                    uses, and receive certain information in a portable form. Where we rely on
                    consent, you can withdraw it at any time; this does not affect processing
                    already carried out. You can also complain to the{" "}
                    <a href="https://ico.org.uk/make-a-complaint/">Information Commissioner&apos;s Office</a>.
                </p>
                <p>
                    To exercise a right or ask a question, email{" "}
                    <a href="mailto:info@moretype.co.uk">info@moretype.co.uk</a>.
                </p>
            </section>
        </div>
    );
}
