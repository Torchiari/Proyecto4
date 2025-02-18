/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Product } from "../../interface/Response"; 
import ProtectedRoute from "@/components/ProtectedRoute";
import Swal from "sweetalert2";
import Products from "../server/product.server";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await Products(); 
      setProducts(fetchedProducts);
    };

    fetchData();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: `${product.name} ha sido agregado al carrito`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Cargando...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 p-6 sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-100 mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-2">{product.description}</p>
              <p className="text-yellow-400 font-semibold mb-2">Precio: ${product.price}</p>
              <p className="text-green-400 font-semibold">Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto w-full bg-yellow-500 text-gray-900 font-bold py-2 rounded-full hover:bg-yellow-600 transition duration-200"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductPage;
