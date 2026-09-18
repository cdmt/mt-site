import { draftMode } from "next/headers";
import { handlePreviewRequest } from "fontdue-js/preview";

const previewCookieOptions = { secure: process.env.NODE_ENV === "production" };

export async function POST(request: Request) {
    const response = await handlePreviewRequest(request, previewCookieOptions);
    if (response.ok) (await draftMode()).enable();
    return response;
}

export async function DELETE(request: Request) {
    const response = await handlePreviewRequest(request, previewCookieOptions);
    (await draftMode()).disable();
    return response;
}
