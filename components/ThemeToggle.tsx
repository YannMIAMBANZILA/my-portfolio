"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Changer le thème"
      className="relative inline-flex h-6 w-11 items-center rounded-full border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    >
      <span
        className={`inline-flex h-4 w-4 transform items-center justify-center rounded-full bg-white text-[10px] shadow transition-transform dark:bg-zinc-100 ${
          isDark ? "translate-x-5" : "translate-x-1"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
