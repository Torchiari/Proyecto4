import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 text-center px-4 space-y-8">
    <h1 className="text-9xl font-extrabold text-red-500 drop-shadow-lg animate-pulse">
      404
    </h1>
    <p className="text-3xl font-semibold tracking-wider">
      Oops! Página no encontrada.
    </p>
    <p className="text-lg text-gray-400 max-w-md leading-relaxed">
      La página que estás buscando no existe. Por favor, verifica la URL o regresa al inicio.
    </p>
    <Link href="/" passHref>
      <span className="mt-10 px-8 py-4 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110">
        Volver al inicio
      </span>
    </Link>
  </div>
  
  );
}
