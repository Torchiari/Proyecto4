import React from "react";

async function fetchProducts() {
  try {
    const response = await fetch("https://proyecto4-nm1r.onrender.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const Products = async () => {
  const products = await fetchProducts();

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return products;
};

export default Products;