"use client";
import { FormEvent, useState } from "react";
//
import form_styles from "../styles/contact.module.css";
import info_styles from "../styles/info.module.css"
import global_styles from "../styles/global.module.css"

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const payload = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            message: String(formData.get("message") ?? "").trim(),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = (await response.json()) as { error?: string };
                setStatus("error");
                setErrorMessage(data.error ?? "Could not send your message. Please try again.");
                return;
            }

            event.currentTarget.reset();
            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMessage("Could not send your message. Please try again.");
        }
    }

    return (
        <section className={`${info_styles.info_page} ${global_styles.page_wrap}`}>
            <p className={form_styles.subtitle}>Send us a message and we will get back to you.</p>

            <form className={form_styles.form} onSubmit={onSubmit}>
                <label className={form_styles.label} htmlFor="name">Name</label>
                <input id="name" name="name" type="text" className={form_styles.input} required />

                <label className={form_styles.label} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className={form_styles.input} required />

                <label className={form_styles.label} htmlFor="message">Message</label>
                <textarea id="message" name="message" className={form_styles.textarea} rows={6} required />

                <button className={form_styles.button} type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send"}
                </button>

                {status === "success" && (
                    <p className={form_styles.success}>Thanks, your message has been sent.</p>
                )}

                {status === "error" && (
                    <p className={form_styles.error}>{errorMessage}</p>
                )}
            </form>
        </section>
    );
}
