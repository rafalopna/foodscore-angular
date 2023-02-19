import { User } from "src/app/auth/interfaces/user";

export interface Restaurant {
  id?: number;
  name: string;
  image: string;
  cuisine: string;
  description: string;
  phone: string;
  daysOpen: string[];
  address: string;
  lat: number;
  lng: number;
  stars: number;
  creator: User;
  distance: number;
  mine: boolean;
}
