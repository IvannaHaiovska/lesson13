import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { IUser } from '../../interface/user/user';
const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  public users: Array<IUser> = [];

    // Http Header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(baseUrl);
  }
  get(id:number): Observable<IUser> {
    return this.http.get<IUser>(`${baseUrl}/${id}`);
  }
  create(data:IUser) {
    return this.http.post(baseUrl, data);
  }
  update(id:number, data:IUser): Observable<IUser> {
    return this.http.put<IUser>(`${baseUrl}/${id}`, data);
  }
  delete(id:number): Observable<IUser> {
    return this.http.delete<IUser>(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<IUser[]> {
    return this.http.delete<IUser[]>(baseUrl);
  }
   // Error 
   handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
