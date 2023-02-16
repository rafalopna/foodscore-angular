import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TokenResponse, UserLoginResponse, UserResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userURL = 'auth';

  constructor(private readonly http: HttpClient) {}

  login(user: UserLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.userURL + '/login', user)
    .pipe(
      map(response => response)
    );
  }

  addNewUser(user: User): Observable<User> {
    return this.http.post<UserResponse>(this.userURL + '/register', user)
    .pipe(
      map(response => response.user)
    );
  }
}
