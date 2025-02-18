/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface CardProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, description, price, stock, image }) => {
  return (
    <div className="bg-gray-800 text-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105">
      <div className="w-full h-64 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition duration-300 transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 transition duration-300 hover:text-yellow-400">
          {name}
        </h2>
        <p className="text-gray-400 mb-4">{description}</p>
        <p className="text-lg font-bold mb-2">Precio: ${price}</p>
        <p className="text-gray-500">Stock: {stock}</p>
      </div>
    </div>
  );
};

export default Card;
