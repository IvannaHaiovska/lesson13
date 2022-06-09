import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const AUTH_API = 'http://localhost:8080/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/signup',
      {
        email,
        password,
      }
    );
  }

  // register(data:IUser): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signup',data);
  // }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { },
    httpOptions);
  }
}
