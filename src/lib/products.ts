import { z } from "zod";
import { cache } from "react";

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  stock: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

// Cache the fetch function to deduplicate requests within the same render
const fetchProducts = cache(async (): Promise<Product[]> => {
  try {
    const response = await fetch("https://api.vercel.app/products", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return z.array(ProductSchema).parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.issues);
    } else {
      console.error("Error fetching products:", error);
    }
    throw error;
  }
});

export async function getProducts(): Promise<Product[]> {
  return fetchProducts();
}

export async function getCategories(products?: Product[]): Promise<string[]> {
  try {
    // If products are provided, use them; otherwise fetch (will use cached result if available)
    const productsData = products ?? await fetchProducts();
    return Array.from(new Set(productsData.map((product) => product.category)));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
