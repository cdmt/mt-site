import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ContactPage from "./page";

type FetchMock = typeof fetch;

function setFetchMock(implementation: FetchMock) {
    Object.defineProperty(globalThis, "fetch", {
        writable: true,
        value: implementation,
    });
}

describe("ContactPage", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        setFetchMock(jest.fn<typeof fetch>());
    });

    it("renders form fields and submit button", () => {
        render(<ContactPage />);

        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Message")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    });

    it("submits trimmed payload and shows success state", async () => {
        const fetchMock = jest.fn<typeof fetch>().mockResolvedValue({ ok: true } as Response);
        setFetchMock(fetchMock);

        render(<ContactPage />);

        fireEvent.change(screen.getByLabelText("Name"), {
            target: { value: "  Chris  " },
        });
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "  chris@example.com  " },
        });
        fireEvent.change(screen.getByLabelText("Message"), {
            target: { value: "  Hello team  " },
        });

        const form = screen.getByRole("button", { name: "Send" }).closest("form");
        if (!form) {
            throw new Error("Expected contact form to exist");
        }

        const resetSpy = jest.spyOn(form, "reset");

        fireEvent.submit(form);

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

        expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Chris",
                email: "chris@example.com",
                message: "Hello team",
            }),
        });

        await waitFor(() => {
            expect(
                screen.getByText("Thanks, your message has been sent.")
            ).toBeInTheDocument();
        });

        expect(resetSpy).toHaveBeenCalledTimes(1);
    });

    it("shows server error response message", async () => {
        const fetchMock = jest.fn<typeof fetch>().mockResolvedValue({
            ok: false,
            json: async () => ({ error: "Bad request" }),
        } as Response);
        setFetchMock(fetchMock);

        render(<ContactPage />);

        const form = screen.getByRole("button", { name: "Send" }).closest("form");
        if (!form) {
            throw new Error("Expected contact form to exist");
        }

        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText("Bad request")).toBeInTheDocument();
        });
    });

    it("shows fallback error when request throws", async () => {
        const fetchMock = jest.fn<typeof fetch>().mockRejectedValue(new Error("Network down"));
        setFetchMock(fetchMock);

        render(<ContactPage />);

        const form = screen.getByRole("button", { name: "Send" }).closest("form");
        if (!form) {
            throw new Error("Expected contact form to exist");
        }

        fireEvent.submit(form);

        await waitFor(() => {
            expect(
                screen.getByText("Could not send your message. Please try again.")
            ).toBeInTheDocument();
        });
    });

    it("disables the submit button while sending", async () => {
        let resolveFetch: ((value: Response | PromiseLike<Response>) => void) | undefined;
        const pendingFetch = new Promise<Response>((resolve) => {
            resolveFetch = resolve;
        });

        const fetchMock = jest.fn<typeof fetch>().mockReturnValue(pendingFetch);
        setFetchMock(fetchMock);

        render(<ContactPage />);

        const button = screen.getByRole("button", { name: "Send" });
        const form = button.closest("form");
        if (!form || !resolveFetch) {
            throw new Error("Expected form and pending fetch resolver to exist");
        }

        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
        });

        resolveFetch({ ok: true } as Response);

        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Send" })).not.toBeDisabled();
        });
    });
});
