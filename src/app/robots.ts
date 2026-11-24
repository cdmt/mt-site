import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moretype.co.uk";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/customer-login"],
        },
        sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    };
}
