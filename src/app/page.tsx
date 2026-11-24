import { fetchGraphql } from "@/lib/graphql";
import { HomePageQuery } from "../../operations-types";
import HomeFontGrid from "@/components/HomeFontGrid";
import { getRandomPangram } from "@/lib/pangrams";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Typefaces",
    description: "Browse Moretype's contemporary typefaces for print, branding, and digital design.",
};

export const revalidate = 0;

async function getData() {
    return fetchGraphql<HomePageQuery>("HomePage.graphql");
}

export default async function Home() {
    const data = await getData();
    const pangram = getRandomPangram();

    return <HomeFontGrid data={data} pangram={pangram} />;
}
