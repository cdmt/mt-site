import globals from "@/app/styles/global.module.css";
import { fetchGraphql } from "@/lib/graphql";
import { FooterQuery } from "../../operations-types";

async function getData() {
  return fetchGraphql<FooterQuery>("Footer.graphql");
}

export default async function Footer() {
  const { viewer } = await getData();

  return (
    <footer className={globals.footer}>
      <p>{viewer?.settings?.footerText}</p>
    </footer>
  );
}