export const theme = {
  name: "Ocean Professional",
  primary: "#2563EB",
  secondary: "#F59E0B",
  success: "#F59E0B",
  error: "#EF4444",
  background: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
  shadow: "0 10px 25px rgba(17, 24, 39, 0.08)",
  radius: 16,
};

export const fonts = {
  family: "Inter, SF Pro Text, Helvetica, Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
};

export const layout = {
  maxWidth: 1080,
  padding: 24,
};

// Utility to apply subtle gradient backgrounds
export const gradientBg = (primary: string) =>
  `radial-gradient(1200px 800px at 50% -10%, ${primary}14, transparent 60%)`;
