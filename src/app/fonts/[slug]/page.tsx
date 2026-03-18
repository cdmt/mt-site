import { notFound } from "next/navigation";
import { fetchGraphql } from "@/lib/graphql";
import { FontsQuery } from "../../../../operations-types";

async function getData() {
    return fetchGraphql<FontsQuery>("Fonts.graphql");
}

export default async function FontPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getData();

    const font = data.viewer?.fontCollections?.edges
        ?.flatMap((edge) => (edge?.node ? [edge.node] : []))
        .find((item) => item.slug?.name === slug);

    if (!font) {
        notFound();
    }

    return (
        <div>
            <h1>{font.name}</h1>
            <p>{font.collectionType}</p>
            {font.url ? (
                <p>
                    <a href={font.url} target="_blank" rel="noreferrer">
                        View source
                    </a>
                </p>
            ) : null}
        </div>
    );
}