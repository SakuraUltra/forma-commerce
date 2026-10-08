import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#313c2b] px-4 py-2.5 text-center text-[10px] tracking-[0.08em] text-[#f5f3e9] sm:text-[11px]">
      <Link
        href="/about"
        className="inline-flex items-center justify-center gap-2 hover:underline underline-offset-4"
      >
        A store to explore. A demo to make your own.
        <span className="hidden sm:inline">No real payments.</span>
        <ArrowUpRight size={12} aria-hidden="true" />
      </Link>
    </div>
  );
}
