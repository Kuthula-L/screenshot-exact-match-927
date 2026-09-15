export const API_BASE_URL =
  (import.meta.env['VITE_API_BASE_URL'] as string | undefined) ?? "http://localhost:8000";

export const CATEGORIES = ["Tops", "Bottoms", "Accessories", "Footwear"] as const;
export type Category = (typeof CATEGORIES)[number];
