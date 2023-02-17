import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { RestaurantResponse, RestaurantsResponse } from '../interfaces/responses';
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

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<RestaurantResponse>(`${this.restaurantURL}/${id}`)
    .pipe(
      map(response => response.restaurant)
    );
  }

  addRestaurant(rest: Restaurant): Observable<Restaurant> {
    return this.http.post<RestaurantResponse>(this.restaurantURL, rest)
    .pipe(
      map(response => response.restaurant)
    );
  }

  deleteRestaurant(id: number): Observable<number> {
    return this.http.delete<number>(`${this.restaurantURL}/${id}`);
  }
}

