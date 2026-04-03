import { fetchGraphql } from "@/lib/graphql";
import { HomePageQuery } from "../../operations-types";
import HomeFontGrid from "@/components/HomeFontGrid";

export const revalidate = 0;

async function getData() {
    return fetchGraphql<HomePageQuery>("HomePage.graphql");
}

export default async function Home() {
    const data = await getData();

    return <HomeFontGrid data={data} />;
}
