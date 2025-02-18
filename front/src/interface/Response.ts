export interface Category {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  image: string;
  categoryId?: Category["id"];
}
export interface User {
  name: string;
  email: string;
  phone: number;
  address: string;
}
export interface Order {
  id: number;
  status: string;
  date: string;
  products: Product[]; // Los productos asociados a la orden
}