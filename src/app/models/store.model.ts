export interface StoreModel {
  name: string;
  logoUrl: string;
  distanceInMeters: number;
  tagIds: string[];
  id: string;
}

export interface StoreTagModel {
  id: string;
  name: string;
}
