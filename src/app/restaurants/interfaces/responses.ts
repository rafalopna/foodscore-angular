import { CommentRest } from "./comment";
import { Restaurant } from "./restaurant";

export interface RestaurantsResponse {
  restaurants: Restaurant[];
}

export interface RestaurantResponse {
  restaurant: Restaurant;
}

export interface CommentsResponse {
  comments: CommentRest[];
}

export interface CommentResponse {
  comment: CommentRest
}
