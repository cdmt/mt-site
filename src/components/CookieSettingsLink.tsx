"use client";

import Link from "next/link";

type CookieSettingsLinkProps = {
    className?: string;
};

export default function CookieSettingsLink({ className }: CookieSettingsLinkProps) {
    return (
        <Link
            href="#cookie-settings"
            className={className}
            onClick={(event) => {
                event.preventDefault();
                window.dispatchEvent(new Event("moretype:open-cookie-preferences"));
            }}
        >
            Cookie settings
        </Link>
    );
}
