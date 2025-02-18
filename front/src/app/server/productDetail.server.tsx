import { Product } from "@/interface/Response";

async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`https://proyecto4-nm1r.onrender.com/products`);
    const data: Product[] = await response.json();
    const product = data.find((item) => item.id === id);
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const ProductDetailServer = async (id: number) => {
  const product = await fetchProductById(id);
  return product;
};

export default ProductDetailServer;
