"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GrApple } from "react-icons/gr";
import { ImCart } from "react-icons/im";
import { AiFillProduct } from "react-icons/ai";
import { BsPersonVcard } from "react-icons/bs";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("cart", JSON.stringify([]));
    setIsAuthenticated(false);

    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión con éxito.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4caf50",
    });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
  <div className="container mx-auto flex justify-between items-center">
    {/* Logo */}
    <a
      href="/"
      className="flex items-center text-2xl font-bold text-gray-200 hover:text-gray-400 space-x-2"
    >
      <GrApple className="text-4xl" />
      <span>iConnect</span>
    </a>

    {/* Navigation Links */}
    <ul className="hidden md:flex space-x-6 items-center">
      <li>
        <a
          href="/product"
          className="flex items-center text-gray-300 text-lg font-medium hover:text-white transition duration-300"
        >
          <AiFillProduct className="text-4xl mr-2" /> Productos
        </a>
      </li>
    </ul>

    {/* Right Section */}
    <div className="hidden md:flex items-center space-x-6">
      {isAuthenticated && (
        <a
          href="/dashboard"
          className="flex items-center text-gray-300 text-lg font-medium hover:text-white transition duration-300"
        >
          <BsPersonVcard className="text-4xl mr-2" /> Mi Cuenta
        </a>
      )}
      <a
        href="/cart"
        className="flex items-center text-gray-300 text-lg font-medium hover:text-white transition duration-300"
      >
        <ImCart className="text-4xl mr-2" />
      </a>
      {isAuthenticated ? (
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Cerrar sesión
        </button>
      ) : (
        <>
          <a
            href="/login"
            className="text-gray-300 text-lg font-medium hover:text-white transition duration-300"
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            className="text-gray-300 text-lg font-medium hover:text-white transition duration-300"
          >
            Registrarse
          </a>
        </>
      )}
    </div>

    {/* Mobile Menu Button */}
    <button className="md:hidden text-gray-300 focus:outline-none hover:text-white">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
  </div>
</nav>

  );
};

export default Navbar;
