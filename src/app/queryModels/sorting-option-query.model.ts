import { ProductQueryModel } from "./product-query.model";

export interface SortingOptionQueryModel {
  label: string;
  value: string;
  property: keyof ProductQueryModel;
}
