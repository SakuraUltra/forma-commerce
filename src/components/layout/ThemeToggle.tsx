"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useClientReady } from "@/lib/use-client-ready";

export default function ThemeToggle() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const mounted = useClientReady();

  if (!mounted) return <div className="h-[18px] w-[18px]" />;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer text-foreground transition-colors hover:text-muted-foreground"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />
      )}
    </button>
  );
}
