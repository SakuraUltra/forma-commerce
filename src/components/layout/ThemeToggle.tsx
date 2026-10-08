"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useClientReady } from "@/lib/use-client-ready";

export default function ThemeToggle() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const mounted = useClientReady();

  if (!mounted) return <div className="h-5 w-5" />;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer text-gray-700 transition-colors hover:text-gray-500 dark:text-neutral-300 dark:hover:text-white"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
