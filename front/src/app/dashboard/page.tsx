"use client";
import { useState, useEffect } from "react";
import { FaUser, FaTachometerAlt } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";
import { User, Order } from "../../interface/Response";
import { fetchUserOrders } from "../server/Dashboard.server";
import { useRouter } from "next/navigation";


const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const { user, orders } = await fetchUserOrders(token);
        setUser(user);
        setOrders(orders);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
        router.push("/login");
      }
    };

    fetchData();
  }, [router]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 mt-16">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 mt-16">
        Cargando...
      </div>
    );
  }
 
  return (
    <ProtectedRoute>
  <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
    <FaTachometerAlt className="w-32 h-32 text-yellow-400 mb-6" />
    <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-transparent bg-clip-text mb-6">
      Dashboard de Usuario
    </h1>
    <p className="text-lg sm:text-xl text-gray-400 mb-8">Bienvenido al panel de control.</p>

    <div className="w-full sm:w-3/4 md:w-1/2 p-8 rounded-lg shadow-xl bg-gray-800 border border-yellow-500">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
        <FaUser className="mr-3 text-yellow-400" /> Información de Usuario
      </h2>
      <p className="text-lg sm:text-xl text-gray-300 mb-2">Nombre: {user.name}</p>
      <p className="text-lg sm:text-xl text-gray-300 mb-2">Email: {user.email}</p>
    </div>

    <div className="w-full sm:w-3/4 md:w-1/2 p-8 mt-10 rounded-lg shadow-xl bg-gray-800 border border-yellow-500">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-transparent bg-clip-text">
        Mis Órdenes
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id} className="text-gray-300 mb-6">
              <ul className="mt-2">
                {order.products.map((product) => (
                  <li key={product.id} className="text-white-400 text-2xl">
                    Producto: {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
              
              <p>Estado: {order.status}</p>
              <p>Fecha: {order.date}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No tienes órdenes aún.</p>
        )}
      </ul>
    </div>
  </div>
</ProtectedRoute>

  );
};

export default Dashboard;