import Link from "next/link";
import type { ReactNode } from "react";
//
import global_styles from "../styles/global.module.css";
import info_styles from "../styles/info.module.css"

export default function InfoLayout({ children }: { children: ReactNode }) {
    return (
        <section>
            <nav aria-label="Info navigation" className={info_styles.sub_nav}>
                <ul className={global_styles.nav_sub_links}>
                    <li><Link href="/info/eula" className={global_styles.nav_link}>EULA</Link></li>
                    <li><Link href="/info/faq" className={global_styles.nav_link}>FAQ</Link></li>
                    <li><Link href="/info/installing-fonts" className={global_styles.nav_link}>Installing Fonts</Link></li>
                </ul>
            </nav>

            <div>{children}</div>
        </section>
    );
}