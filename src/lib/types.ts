export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Corresponds to the ID in placeholder-images.json
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
