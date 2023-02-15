import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserResponse } from "../interfaces/responses";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userURL = 'auth';

  constructor(private readonly http: HttpClient) {}

  addNewUser(user: User): Observable<User> {
    return this.http.post<UserResponse>(this.userURL + '/register', user)
    .pipe(
      map(response => response.user)
    );
  }
}
