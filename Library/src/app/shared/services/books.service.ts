import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, EMPTY } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { Categories } from '../models/categories.model';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  loginUser: BehaviorSubject<object> = new BehaviorSubject<object>({});
  orders: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
  sendIdToPayment: BehaviorSubject<number> = new BehaviorSubject<any>(null);
  sendIdToRent: BehaviorSubject<number> = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient) {}

  public getBooks(): Observable<Book[]> {
    return this._http.get<Book[]>('/api/books');
  }

  public deleteBook(bookId: number): Observable<Book[]> {
    return this._http.delete<Book[]>(`/api/books/${bookId}`);
  }

  public editBook(bookId: number, updateForm: object): Observable<Book[]> {
    return this._http.put<Book[]>(`/api/books/${bookId}`, updateForm);
  }

  public getCategories(): Observable<Categories[]> {
    return this._http.get<Categories[]>('/api/categories');
  }

  public postAuthenticationLogin(login: object): Observable<object> {
    return this._http.post<object>('/api/auth/login', login);
  }

  public postAuthenticationRegister(newUserAccountValue: object): Observable<object> {
    return this._http.post<object>('/api/auth/register', newUserAccountValue);
  }

  public postOrder(body: object): Observable<object> {
    return this._http.post<object>('/api/orders', body);
  }

  public rentedBooksPost(body: object): Observable<object> {
    return this._http.post<object>('/api/rented', body);
  }

  public getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>('/api/users');
  }

  public editUsers(userId: number, updateUser: object): Observable<Users[]> {
    return this._http.put<Users[]>(`/api/users/${userId}`, updateUser);
  }

  public deleteUser(userId: number): Observable<Users[]> {
    return this._http.delete<Users[]>(`/api/users/${userId}`);
  }
}
