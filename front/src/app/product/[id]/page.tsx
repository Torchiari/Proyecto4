"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductDetailServer from "../../server/productDetail.server";
import { Product } from "@/interface/Response";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedProduct = await ProductDetailServer(Number(id));
        setProduct(fetchedProduct);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Cargando...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 p-6 sm:p-10">
        <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-100 mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="text-yellow-400 font-semibold text-xl mb-4">
            Precio: ${product.price}
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductDetail;
