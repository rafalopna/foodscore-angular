import { Restaurant } from "./restaurant";

export interface RestaurantsResponse {
  restaurants: Restaurant[];
}

export interface RestaurantResponse {
  restaurant: Restaurant;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment
}
