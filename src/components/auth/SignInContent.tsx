import Link from "next/link";
export default function SignInContent() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Explore as a guest</h1>
      <p className="my-6 leading-7 text-muted-foreground">
        No account is needed for this demo. Your cart and demo orders stay in
        this browser.
      </p>
      <Link
        className="rounded-lg bg-foreground px-5 py-3 text-sm text-background"
        href="/orders"
      >
        View demo orders
      </Link>
      <Link className="mt-6 block text-sm underline" href="/products">
        Continue shopping
      </Link>
    </div>
  );
}
