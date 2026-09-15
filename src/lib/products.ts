import { API_BASE_URL } from "@/lib/config";
import { MOCK_PRODUCTS, type Product } from "@/data/products";

export const productsQueryOptions = {
  queryKey: ["products"],
  queryFn: async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as Product[] | { products?: Product[] };
      const list = Array.isArray(data) ? data : (data.products ?? []);
      if (!list.length) return MOCK_PRODUCTS;
      return list;
    } catch {
      // API not connected yet — fall back to the seeded catalogue.
      return MOCK_PRODUCTS;
    }
  },
  staleTime: 5 * 60 * 1000,
};

export const formatZar = (price: number) => `R ${Math.round(price)}.00`;
