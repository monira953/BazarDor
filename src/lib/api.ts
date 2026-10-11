
import type { Product, Category } from "@/lib/utils";

const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  let lastError: unknown;

  for (const baseURL of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseURL}${cleanEndpoint}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Unable to fetch ${cleanEndpoint} from either API URL. ${
      lastError instanceof Error ? lastError.message : ""
    }`,
  );
}

function extractList<T>(
  response: unknown,
  possibleKeys: string[],
): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (typeof response === "object" && response !== null) {
    const result = response as Record<string, unknown>;

    for (const key of possibleKeys) {
      const value = result[key];

      if (Array.isArray(value)) {
        return value as T[];
      }
    }
  }

  return [];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchApi<unknown>("/products");

  return extractList<Product>(response, ["data", "products", "results"]);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetchApi<unknown>("/categories");

  return extractList<Category>(response, ["data", "categories", "results"]);
}

export async function getProductsByCategory(
  slug: string,
): Promise<Product[]> {
  const response = await fetchApi<unknown>(
    `/products?category=${encodeURIComponent(slug)}`,
  );

  return extractList<Product>(response, ["data", "products", "results"]);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await getCategories();

  return categories.find((category) => category.slug === slug) ?? null;
}