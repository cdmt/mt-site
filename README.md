This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form Email Setup

The contact page posts to `/api/contact`, which sends email using SMTP.

Create `.env.local` with:

```bash
NEXT_PUBLIC_FONTDUE_URL=https://moretype.fontdue.com/
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_TLS_SERVERNAME=your.smtp.certificate.name

# Optional overrides
CONTACT_TO_EMAIL=info@moretype.co.uk
CONTACT_FROM_EMAIL=no-reply@moretype.co.uk
```

Notes:

- `SMTP_PORT=465` uses secure SMTP (`secure: true`).
- Any other port (for example `587`) uses STARTTLS (`secure: false`).
- `SMTP_TLS_SERVERNAME` is optional, but required if your SMTP provider's TLS certificate name does not match `SMTP_HOST`.
- Commit `.env.example`, not `.env.local`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For the contact form to work in production, add the real values from your local `.env.local` to your Vercel project's Environment Variables before redeploying.

Required for the contact API route:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

Usually required for this SMTP setup:

- `SMTP_TLS_SERVERNAME`

Optional overrides:

- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

If these are missing in Vercel, the deployed `/api/contact` route will return a 500 error when it tries to send mail.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
