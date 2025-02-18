"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { loginUser } from "../server/Login.server"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
      });
      return;
    }


    const result = await loginUser({ email, password });

    if (!result.success) {
      setError(result.error || "");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      });
      return;
    }

 
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));

    Swal.fire({
      icon: "success",
      title: "¡Bienvenido!",
      text: "Has iniciado sesión con éxito.",
    });

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md border border-yellow-500">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
        Iniciar sesión
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mt-1 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mt-1 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-3 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 transform hover:scale-105 transition-transform duration-300"
        >
          Iniciar sesión
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors"
          >
            Registrate
          </Link>
        </p>
    </div>
  </div>
  
  );
};

export default LoginPage;