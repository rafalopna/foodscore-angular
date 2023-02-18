import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { UserResponse } from 'src/app/auth/interfaces/responses';
import { User } from 'src/app/auth/interfaces/user';
import { ProfileAvatar, ProfileData, ProfilePassword } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'users';

  constructor(private http: HttpClient) { }

  getUser(id?: number): Observable<User>{
    if(id === undefined || isNaN(id)) {
      return this.http.get<UserResponse>(this.userURL + '/me')
      .pipe(
        map(response => response.user)
      );
    }

    return this.http.get<UserResponse>(this.userURL + `/${id}`)
    .pipe(
      map(response => response.user)
    );
  }

  putData(data: ProfileData): Observable<string> {
    return this.http.put<string>(this.userURL + '/me',data)
    .pipe(
      map(response => response)
    );
  }

  putImage(data: ProfileAvatar): Observable<string> {
    return this.http.put<string>(this.userURL + '/me/avatar',data)
    .pipe(
      map(response => response)
    );
  }

  putPassword(data: ProfilePassword): Observable<string> {
    return this.http.put<string>(this.userURL + '/me/password',data)
    .pipe(
      map(response => response)
    );
  }

}
