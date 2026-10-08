import Link from "next/link";
export default function AnnouncementBar() {
  return (
    <div className="bg-neutral-900 px-4 py-2.5 text-center text-xs tracking-wide text-white">
      <Link href="/about" className="hover:underline">
        DEMO STORE · Explore freely. No real charges or shipments. ↗
      </Link>
    </div>
  );
}
