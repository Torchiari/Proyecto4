"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../server/Register.server";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    const result = await registerUser({ name, email, password, address, phone });

    if (!result.success) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "¡Tu cuenta ha sido registrada!",
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-6">
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg border border-yellow-500">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-transparent bg-clip-text">
        Registrar
      </h1>
  
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Nombre de usuario</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mt-1 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
        </div>
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
          <label className="block text-gray-400 font-semibold">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mt-1 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Dirección</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mt-1 text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-3 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 transform hover:scale-105 transition-transform duration-300"
        >
          Registrar
        </button>
      </form>
      <p className="mt-6 text-center text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors"
          >
            Inicia sesión
          </a>
        </p>
    </div>
  </div>
  

  );
};

export default RegisterPage;