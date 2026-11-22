import { useEffect, useState } from "react";

const KEY = "admin-theme";

const initial = () =>
  localStorage.getItem(KEY) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function useTheme() {
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    document.documentElement.dataset.adminTheme = theme;
    localStorage.setItem(KEY, theme);
    return () => {
      delete document.documentElement.dataset.adminTheme;
    };
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}