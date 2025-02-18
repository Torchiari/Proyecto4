import { AppDataSource } from "../config/dataSource";
import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 11",
    price: 699,
    description:
      "Experimenta la potencia y la elegancia con el iPhone 11: captura momentos increíbles con su sistema de doble cámara, disfruta de un rendimiento excepcional y sumérgete en una brillante pantalla Liquid Retina. ¡Descubre un mundo de posibilidades en la palma de tu mano!",
    image:
      "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/03/iphone-13-2.png?fit=2498%2C1208&quality=50&strip=all&ssl=1",
    categoryId: 1,
    stock: 10,
  },
  {
    name: "MacBook Air",
    price: 999,
    description:
      "Adopte la eficiencia y la sofisticación con la MacBook Air: un diseño liviano se combina con un rendimiento potente, una pantalla Retina sorprendente que le da vida a su trabajo y una batería que dura todo el día lo mantiene productivo dondequiera que vaya. Mejore su experiencia informática con la MacBook Air.",
    image:
      "https://media.wired.com/photos/5bd883dc5b66a763e54f0b22/master/pass/macbookair3.jpg",
    categoryId: 2,
    stock: 10,
  },
  {
    name: "iPad Pro",
    price: 799,
    description:
      "Da rienda suelta a tu creatividad y productividad con el iPad Pro: un rendimiento potente, una pantalla Liquid Retina espectacular y una batería que dura todo el día hacen del iPad Pro la herramienta perfecta para trabajar y jugar. Transforma tus ideas en realidad con el iPad Pro.",
    image:
      "https://itndaily.ru/wp-content/uploads/2024/05/OLED-iPad-Prp-title.jpg",
    categoryId: 3,
    stock: 10,
  },
  {
    name: "Apple Watch Series 6",
    price: 399,
    description:
      "Mantente conectado y saludable con el Apple Watch Series 6: haz un seguimiento de tus entrenamientos, controla tu salud y mantente en contacto con las personas y la información que más te importan. Experimenta el futuro de la salud y el bienestar con el Apple Watch Series 6.",
    image:
      "https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020_big.jpg.large.jpg",
    categoryId: 4,
    stock: 10,
  },
  {
    name: "AirPods Pro",
    price: 249,
    description:
      "Sumérgete en el sonido con los AirPods Pro: la cancelación activa de ruido, el modo de transparencia y el ajuste personalizable hacen que los AirPods Pro sean el compañero perfecto para la música, las llamadas y todo lo demás. Mejora tu experiencia de audio con los AirPods Pro.",
    image:
      "https://www.apple.com/v/airpods-pro/m/images/meta/og__eui2mpgzwyaa_overview.png",
    categoryId: 5,
    stock: 10,
  },
  {
    name: "HomePod mini",
    price: 99,
    description:
      "Mejora tu experiencia de audio en casa con el HomePod mini: sonido envolvente, asistente inteligente y centro de control del hogar inteligente hacen que el HomePod mini sea el complemento perfecto para tu hogar. Disfruta de un mundo de música, noticias y mucho más con el HomePod mini.",
    image:
      "https://www.letemsvetemapplem.eu/wp-content/uploads/2017/06/homepod-fb.png",
    categoryId: 6,
    stock: 10,
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length)
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Product)
      .values(productsToPreLoad)
      .execute();
  console.log("Products preloaded");
};
