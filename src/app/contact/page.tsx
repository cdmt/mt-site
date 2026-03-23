"use client";

import { FormEvent, useState } from "react";
import styles from "../styles/contact.module.css";
import info_styles from "../styles/info.module.css"

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
        <section className={info_styles.info_page}>
            <p className={styles.subtitle}>Send us a message and we will get back to you.</p>

            <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input id="name" name="name" type="text" className={styles.input} required />

                <label className={styles.label} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className={styles.input} required />

                <label className={styles.label} htmlFor="message">Message</label>
                <textarea id="message" name="message" className={styles.textarea} rows={6} required />

                <button className={styles.button} type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send"}
                </button>

                {status === "success" && (
                    <p className={styles.success}>Thanks, your message has been sent.</p>
                )}

                {status === "error" && (
                    <p className={styles.error}>{errorMessage}</p>
                )}
            </form>
        </section>
    );
}
