import { useTheme } from "next-themes";

export const useCurrentTheme = () => {
  const { theme, systemTheme } = useTheme();

  if (theme === "dark" || theme === "ligt") return theme;

  return systemTheme;
};
