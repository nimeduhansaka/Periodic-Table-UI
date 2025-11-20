"use client";

export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
        <body className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold">Something went wrong</h1>
            <p className="text-white/70">{error?.message ?? "Unknown error"}</p>
            <button
                onClick={() => reset()}
                className="rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
            >
                Try again
            </button>
        </div>
        </body>
        </html>
    );
}
