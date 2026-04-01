/** @jest-environment node */

import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import nodemailer from "nodemailer";

import { POST } from "./route";

type SendMailArgs = {
    to: string;
    from: string;
    replyTo: string;
    subject: string;
    text: string;
    html: string;
};

const sendMailMock = jest.fn<(mail: SendMailArgs) => Promise<void>>();
let createTransportSpy: jest.SpiedFunction<typeof nodemailer.createTransport>;

function makeRequest(body: unknown) {
    return new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
}

describe("POST /api/contact", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();
        createTransportSpy = jest.spyOn(nodemailer, "createTransport").mockReturnValue({
            sendMail: sendMailMock,
        } as unknown as ReturnType<typeof nodemailer.createTransport>);
        process.env = {
            ...originalEnv,
            SMTP_HOST: "smtp.example.com",
            SMTP_PORT: "587",
            SMTP_USER: "mailer@example.com",
            SMTP_PASS: "secret",
            CONTACT_TO_EMAIL: "info@moretype.co.uk",
            CONTACT_FROM_EMAIL: "web@moretype.co.uk",
        };
        sendMailMock.mockResolvedValue(undefined);
    });

    afterEach(() => {
        createTransportSpy.mockRestore();
        process.env = originalEnv;
    });

    it("returns 400 for missing required fields", async () => {
        const response = await POST(
            makeRequest({ name: "", email: "test@example.com", message: "Hello" })
        );

        expect(response.status).toBe(400);
        await expect(response.json()).resolves.toEqual({
            error: "Please complete all fields.",
        });
        expect(createTransportSpy).not.toHaveBeenCalled();
    });

    it("returns 400 for invalid email", async () => {
        const response = await POST(
            makeRequest({ name: "Chris", email: "invalid", message: "Hello" })
        );

        expect(response.status).toBe(400);
        await expect(response.json()).resolves.toEqual({
            error: "Please provide a valid email address.",
        });
        expect(createTransportSpy).not.toHaveBeenCalled();
    });

    it("sends email and returns 200 for valid payload", async () => {
        const response = await POST(
            makeRequest({
                name: "  Chris  ",
                email: "  chris@example.com  ",
                message: "  Hello there\nSecond line  ",
            })
        );

        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toEqual({ ok: true });

        expect(nodemailer.createTransport).toHaveBeenCalledWith(
            expect.objectContaining({
                host: "smtp.example.com",
                port: 587,
                secure: false,
                auth: {
                    user: "mailer@example.com",
                    pass: "secret",
                },
            })
        );

        expect(sendMailMock).toHaveBeenCalledTimes(1);
        expect(sendMailMock).toHaveBeenCalledWith(
            expect.objectContaining({
                to: "info@moretype.co.uk",
                from: "web@moretype.co.uk",
                replyTo: "chris@example.com",
                subject: "Website contact form: Chris",
                text: "Name: Chris\nEmail: chris@example.com\n\nHello there\nSecond line",
            })
        );
    });

    it("returns 500 when email send fails", async () => {
        const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => undefined);
        sendMailMock.mockRejectedValueOnce(new Error("SMTP failure"));

        const response = await POST(
            makeRequest({
                name: "Chris",
                email: "chris@example.com",
                message: "Hello",
            })
        );

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({
            error: "Unable to send your message right now. Please try again later.",
        });
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it("uses SMTP_TLS_SERVERNAME when configured", async () => {
        process.env.SMTP_TLS_SERVERNAME = "extendcp.co.uk";

        const response = await POST(
            makeRequest({
                name: "Chris",
                email: "chris@example.com",
                message: "Hello",
            })
        );

        expect(response.status).toBe(200);
        expect(nodemailer.createTransport).toHaveBeenCalledWith({
            host: "smtp.example.com",
            port: 587,
            secure: false,
            auth: {
                user: "mailer@example.com",
                pass: "secret",
            },
            tls: {
                servername: "extendcp.co.uk",
            },
        });
    });

    it("retries with SMTP_USER when custom sender is rejected", async () => {
        process.env.CONTACT_FROM_EMAIL = "no-reply@moretype.co.uk";
        sendMailMock
            .mockRejectedValueOnce({
                responseCode: 553,
                code: "EENVELOPE",
            })
            .mockResolvedValueOnce(undefined);

        const response = await POST(
            makeRequest({
                name: "Chris",
                email: "chris@example.com",
                message: "Hello",
            })
        );

        expect(response.status).toBe(200);
        expect(sendMailMock).toHaveBeenCalledTimes(2);
        expect(sendMailMock).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                from: "no-reply@moretype.co.uk",
            })
        );
        expect(sendMailMock).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                from: "mailer@example.com",
            })
        );
    });
});
