import type { MetadataRoute } from "next";
import { fetchGraphql } from "@/lib/graphql";
import type { HomePageQuery } from "../../operations-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://moretype.co.uk").replace(/\/$/, "");
    const data = await fetchGraphql<HomePageQuery>("HomePage.graphql");

    const fontPages = data.viewer.fontCollections?.edges
        ?.map((edge) => edge?.node?.slug?.name)
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => ({
            url: `${siteUrl}/fonts/${slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })) ?? [];

    return [
        { url: siteUrl, changeFrequency: "monthly", priority: 1 },
        { url: `${siteUrl}/info/about`, changeFrequency: "yearly", priority: 0.6 },
        { url: `${siteUrl}/info/faq`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${siteUrl}/info/installing-fonts`, changeFrequency: "yearly", priority: 0.6 },
        { url: `${siteUrl}/info/eula`, changeFrequency: "yearly", priority: 0.5 },
        { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
        ...fontPages,
    ];
}
