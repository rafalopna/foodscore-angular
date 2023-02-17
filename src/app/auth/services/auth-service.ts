import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, ReplaySubject, tap } from "rxjs";
import { TokenResponse, UserResponse } from "../interfaces/responses";
import { User, UserLogin, UserSocialLogin } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userURL = 'auth';
  public loginChange$ = new ReplaySubject<boolean>(1);
  private logged = false;

  constructor(private readonly http: HttpClient) {}

  login(user: UserLogin): Observable<void> {
    return this.http.post<TokenResponse>(this.userURL + '/login', user)
    .pipe(
      map(response => {
        localStorage.setItem('access_token',response.accessToken);
        this.userLogged(true);
      })
    );
  }

  loginGoogle(user: UserSocialLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.userURL + '/google', user)
    .pipe(
      map(response => {
        localStorage.setItem('access_token',response.accessToken);
        this.userLogged(true);
        return response;
      })
    );
  }

  loginFacebook(user: UserSocialLogin): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.userURL + '/facebook', user)
    .pipe(
      map(response => {
        localStorage.setItem('access_token',response.accessToken);
        this.userLogged(true);
        return response;
      })
    );
  }

  userLogged(isLogged: boolean): void {
    this.logged = isLogged;
    this.loginChange$.next(isLogged);
  }

  addNewUser(user: User): Observable<User> {
    return this.http.post<UserResponse>(this.userURL + '/register', user)
    .pipe(
      map(response => response.user)
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.userLogged(false);
  }

  isLogged(): Observable<boolean> {
    const access_token = localStorage.getItem('access_token');

    if(!this.logged && !access_token){
      return of(false);
    } else if (this.logged && access_token) {
      return of(true);
    } else if (!this.logged && access_token) {
      return this.http.get<boolean>(this.userURL + '/validate')
      .pipe(
        tap(isValid => {
          if(isValid) {
            this.logged = true;
            this.loginChange$.next(true);
          } else {
            localStorage.removeItem('access_token');
          }
        })
      )
    }
    return of(false);
  }
}
