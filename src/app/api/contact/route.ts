import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
    name?: string;
    email?: string;
    message?: string;
};

type MailSendError = {
    responseCode?: number;
    code?: string;
};

function getRequiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function isSenderRejectedError(error: unknown): boolean {
    if (!error || typeof error !== "object") {
        return false;
    }

    const smtpError = error as MailSendError;
    return smtpError.responseCode === 553 || smtpError.code === "EENVELOPE";
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ContactPayload;

        const name = (body.name ?? "").trim();
        const email = (body.email ?? "").trim();
        const message = (body.message ?? "").trim();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }

        if (message.length > 5000) {
            return NextResponse.json({ error: "Message is too long." }, { status: 400 });
        }

        const host = getRequiredEnv("SMTP_HOST");
        const port = Number(getRequiredEnv("SMTP_PORT"));
        const user = getRequiredEnv("SMTP_USER");
        const pass = getRequiredEnv("SMTP_PASS");
        const tlsServername = (process.env.SMTP_TLS_SERVERNAME ?? "").trim();

        if (Number.isNaN(port)) {
            throw new Error("SMTP_PORT must be a valid number.");
        }

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: {
                user,
                pass,
            },
            ...(tlsServername
                ? {
                      tls: {
                          servername: tlsServername,
                      },
                  }
                : {}),
        });

        const toAddress = process.env.CONTACT_TO_EMAIL ?? "info@moretype.co.uk";
        const fromAddress = process.env.CONTACT_FROM_EMAIL ?? user;
        const baseMail = {
            to: toAddress,
            replyTo: email,
            subject: `Website contact form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
        };

        try {
            await transporter.sendMail({
                ...baseMail,
                from: fromAddress,
            });
        } catch (error) {
            if (fromAddress !== user && isSenderRejectedError(error)) {
                await transporter.sendMail({
                    ...baseMail,
                    from: user,
                });
            } else {
                throw error;
            }
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error("Contact form email send failed", error);
        return NextResponse.json(
            { error: "Unable to send your message right now. Please try again later." },
            { status: 500 },
        );
    }
}
