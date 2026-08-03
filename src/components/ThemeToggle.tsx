"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const currentTheme =
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  if (!mounted) {
    return (
      <button className="theme-toggle-btn" aria-label="Toggle theme">
        <div className="theme-toggle-icon-container">
          <i className="fa-solid fa-moon"></i>
        </div>
        <span className="theme-toggle-label">Dark</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${theme}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="theme-toggle-icon-container">
        {theme === "dark" ? (
          <i className="fa-solid fa-sun icon-sun"></i>
        ) : (
          <i className="fa-solid fa-moon icon-moon"></i>
        )}
      </div>
      <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
