export class Product {
  id: number;
  name: string;
  brand: string;
  imageCover: string;
  stars: number;
  discount?: number;
  category: string;
  description: string;
  size?: string | null;
  instalments: number;
  assessments?: {
    id: number;
    name: string;
    comment: string;
    stars: number;
    dateCommment: string;
  }[];
  goodToKnow?: { id: number; description: string }[];
  priceInitial: string;
  priceWithDiscount: string;
  quantity: number;
  stateProduct?: string;
  sex: string;
}
