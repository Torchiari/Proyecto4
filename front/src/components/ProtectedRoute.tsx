"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Si no hay token, redirigir al login con un mensaje
      Swal.fire({
        icon: "error",
        title: "No autorizado",
        text: "Por favor, inicia sesión para acceder a esta página.",
      });
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;