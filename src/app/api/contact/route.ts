import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
    name?: string;
    email?: string;
    message?: string;
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
        });

        const toAddress = process.env.CONTACT_TO_EMAIL ?? "info@moretype.co.uk";
        const fromAddress = process.env.CONTACT_FROM_EMAIL ?? user;

        await transporter.sendMail({
            to: toAddress,
            from: fromAddress,
            replyTo: email,
            subject: `Website contact form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error("Contact form email send failed", error);
        return NextResponse.json(
            { error: "Unable to send your message right now. Please try again later." },
            { status: 500 },
        );
    }
}
