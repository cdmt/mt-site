"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = LinkProps & {
    children: ReactNode;
    className?: string;
    activeClassName?: string;
    exact?: boolean;
};

export default function NavLink({
    children,
    className,
    activeClassName,
    exact = true,
    ...props
}: NavLinkProps) {
    const pathname = usePathname();
    const href = typeof props.href === "string" ? props.href : props.href.pathname ?? "";

    const isActive = exact
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    const classes = [className, isActive ? activeClassName : undefined]
        .filter(Boolean)
        .join(" ");

    return (
        <Link {...props} className={classes} aria-current={isActive ? "page" : undefined}>
            {children}
        </Link>
    );
}
