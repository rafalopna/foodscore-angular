import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { CommentRest } from '../interfaces/comment';
import { CommentResponse, CommentsResponse, RestaurantResponse, RestaurantsResponse } from '../interfaces/responses';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private restaurantURL = 'restaurants';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<RestaurantsResponse>(this.restaurantURL)
    .pipe(
      retry(3),
      map(response => response.restaurants),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error getting restaurants. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  getRestaurantsUser(id: number): Observable<Restaurant[]> {
    return this.http.get<RestaurantsResponse>(this.restaurantURL + '/user/' + id)
    .pipe(
      retry(3),
      map(response => response.restaurants),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          `Error getting restaurants. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<RestaurantResponse>(`${this.restaurantURL}/${id}`)
    .pipe(
      map(response => response.restaurant)
    );
  }

   getComments(id: number): Observable<CommentRest[]> {
    return this.http.get<CommentsResponse>(`${this.restaurantURL}/${id}/comments`)
    .pipe(
      map(response => response.comments)
    );
  }

  addRestaurant(rest: Restaurant): Observable<Restaurant> {
    return this.http.post<RestaurantResponse>(this.restaurantURL, rest)
    .pipe(
      map(response => response.restaurant)
    );
  }

  addComment(id: number, commentR: CommentRest): Observable<CommentRest> {
    return this.http.post<CommentResponse>(`${this.restaurantURL}/${id}/comments`, commentR)
    .pipe(
      map(response => response.comment)
    );
  }

  deleteRestaurant(id: number): Observable<number> {
    return this.http.delete<number>(`${this.restaurantURL}/${id}`);
  }
}

