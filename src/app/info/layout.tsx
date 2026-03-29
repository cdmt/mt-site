import type { ReactNode } from "react";
//
import NavLink from "@/components/NavLink";
import global_styles from "../styles/global.module.css";
import info_styles from "../styles/info.module.css"

export default function InfoLayout({ children }: { children: ReactNode }) {
    return (
        <section>
            <nav aria-label="Info navigation" className={info_styles.sub_nav}>
                <ul className={global_styles.nav_sub_links}>
                    <li>
                        <NavLink href="/info/eula" className={global_styles.nav_link} activeClassName={global_styles.nav_link_active}>
                            EULA
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/info/faq" className={global_styles.nav_link} activeClassName={global_styles.nav_link_active}>
                            FAQ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/info/installing-fonts" className={global_styles.nav_link} activeClassName={global_styles.nav_link_active}>
                            Installing Fonts
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div>{children}</div>
        </section>
    );
}