import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BorrowedBookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyBorrowedBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-borrowed-books`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}