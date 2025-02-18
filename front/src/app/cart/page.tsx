// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";
import CartServer from "../server/Cart.server";
import Swal from "sweetalert2"
import { Product } from "@/interface/Response";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Cart = () => {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { cartItems, totalAmount } = await CartServer();
      setCartItems(cartItems);
      setTotalAmount(totalAmount);
    };

    fetchData();
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    setTotalAmount(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setTotalAmount(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para realizar la compra.",
      });
      router.push("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id || cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo procesar la compra. Verifica tu carrito o sesión.",
      });
      return;
    }

    const order = {
      userId: user.id,
      products: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
    };

    try {
      const response = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al procesar la compra.");
      }

      Swal.fire({
        icon: "success",
        title: "Compra realizada con éxito",
        text: `El total a abonar es $${totalAmount}`,
      });

      setCartItems([]);
      setTotalAmount(0);
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al procesar la compra.",
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 p-6 sm:p-10">
          <FaShoppingCart className="w-32 h-32 text-yellow-400 mb-6" />
          <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">Carrito Vacío</h1>
          <p className="text-2xl text-gray-400">No tienes productos en tu carrito.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-yellow-500 mb-10">Tu Carrito</h1>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <Image src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-400">Precio: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-4 py-2 rounded">
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <p>Total: ${totalAmount}</p>
          <button onClick={handlePurchase} className="bg-yellow-500 px-6 py-2 rounded mt-4">
            Comprar
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
