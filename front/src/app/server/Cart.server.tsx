import { Product } from "@/interface/Response";

async function fetchCartData(): Promise<(Product & { quantity: number })[]> {
  try {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    return cartData;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return [];
  }
}

export default async function CartServer() {
  const cartItems = await fetchCartData();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { cartItems, totalAmount };
}
