import Link from "next/link";
import type { ReactNode } from "react";
import globals from "../styles/global.module.css";

export default function InfoLayout({ children }: { children: ReactNode }) {
    return (
        <section>
            <nav aria-label="Info navigation">
                <ul className={globals.nav_site_links}>
                    <li><Link href="/info/eula">EULA</Link></li>
                    <li><Link href="/info/faq">FAQ</Link></li>
                    <li><Link href="/info/installing-fonts">Installing Fonts</Link></li>
                </ul>
            </nav>

            <div>{children}</div>
        </section>
    );
}