"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
      <div className="text-6xl">📡</div>
      <h1 className="font-bodoni text-3xl font-bold tracking-tight">
        Du är offline
      </h1>
      <p className="max-w-md text-muted-foreground">
        Det verkar som att du inte har någon internetanslutning just nu. Kontrollera din
        anslutning och försök igen.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Försök igen
      </button>
    </div>
  );
}
