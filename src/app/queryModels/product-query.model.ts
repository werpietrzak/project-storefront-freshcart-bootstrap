export interface ProductQueryModel {
  name: string;
  price: number;
  category: string;
  ratingValue: number;
  ratingCount: number;
  ratingStars: number[];
  featureValue: number;
  imageUrl: string;
  id: string;
  isWishlisted: boolean;
}
