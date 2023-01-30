export interface StoreModel {
  name: string;
  logoUrl: string;
  distanceInMeters: number;
  tagIds: string[];
  id: string;
}

export interface StoreQueryModel {
  name: string;
  logoUrl: string;
  distance: number;
  tagIds: string[];
  id: string;
}
