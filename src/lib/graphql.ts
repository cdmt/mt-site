import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { createFontdueFetch, FontdueNotFoundError } from "fontdue-js/server";

const getStaticQuery = async (queryName: string) => {
  let query = await fs.readFile(
    path.resolve(process.cwd(), "src", "queries", queryName),
    "utf8",
  );

  return query;
};

const fetchGraphql = async <Q, V = void>(
  queryName: string,
  variables?: V,
): Promise<Q> => {
  const query = await getStaticQuery(queryName);
  const fetchFontdue = createFontdueFetch();
  try {
    return await fetchFontdue<Q, V>(queryName, query, variables);
  } catch (error) {
    if (error instanceof FontdueNotFoundError) notFound();
    throw error;
  }
};

export { fetchGraphql, getStaticQuery };
