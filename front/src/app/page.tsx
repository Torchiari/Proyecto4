import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Imagen de fondo */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image 
          src="/images/fondo.jpg"
          alt="Productos Apple" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-10 leading-tight font-serif tracking-wide">
            Bienvenido a iConnect
          </h1>
          <div className="space-y-6">
            <p className="text-lg text-gray-300">
              Descubre la última tecnología de Apple, diseñada para ofrecerte lo mejor en innovación y estilo.
            </p>
            <p className="text-lg text-gray-300">
              Desde el iPhone hasta los MacBooks, cada dispositivo está creado para ofrecer un rendimiento excepcional y un diseño icónico.
            </p>
            <p className="text-lg text-gray-300">
              Navega por nuestra selección de productos Apple y encuentra la herramienta perfecta para ti, ya sea para trabajo, creatividad o entretenimiento.
            </p>
            <p className="text-lg text-gray-300">
              Disfruta de la experiencia de usuario más fluida y de un ecosistema único con Apple.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Tu próximo dispositivo Apple te está esperando. ¿Estás listo para dar el siguiente paso?
            </p>
            <p className="text-lg text-gray-300 mb-8">
             Para ver los productos crea una cuenta aca:
            </p>
            {/* Botón de redirección */}
            <div className="flex justify-center">
              <Link href="./register">
                <button className="px-8 py-4 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all">
                  Registrate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
