import Link from "next/link";

export default function NotFound() {
  return (
    <section className="soft-gradient flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-3">This page has been recycled</h1>
      <p className="prose-muted mt-4 max-w-md">
        Like good fiber, URLs sometimes get repulped into something new. Let&apos;s get you back to
        fresh stock.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/products" className="btn-secondary">
          Browse products
        </Link>
      </div>
    </section>
  );
}
