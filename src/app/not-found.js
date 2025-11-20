"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <html lang="en">
        <body className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold">Page not found</h1>
            <p className="text-white/70">The requested resource does not exist.</p>
            <Link
                href="/"
                className="rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
            >
                Go home
            </Link>
        </div>
        </body>
        </html>
    );
}
