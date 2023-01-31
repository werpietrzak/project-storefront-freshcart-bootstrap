import { ProductModel } from "../models/product.model";

export interface SortingOptionQueryModel {
  label: string;
  value: string;
  property: keyof ProductModel;
}
