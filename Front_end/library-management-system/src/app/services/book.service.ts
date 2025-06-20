import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Book } from '../book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }

  addBook(bookData: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, bookData, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }

  updateBook(id: number, bookData: Book): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${id}`, bookData, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${id}`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}