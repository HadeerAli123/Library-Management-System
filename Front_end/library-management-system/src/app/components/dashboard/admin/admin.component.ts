import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service'; 
import { Router } from '@angular/router';
import { Book } from '../../../book.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, public router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
      },
      (error: any) => {
        console.error('فشل جلب الكتب', error);
      }
    );
  }

  addBook() {
    this.router.navigate(['/books/add']);
  }

  editBook(id: number) {
    this.router.navigate([`/books/${id}/edit`]);
  }

  deleteBook(id: number) {
    if (confirm('هل أنت متأكد إنك عايز تمسح الكتاب؟')) {
      this.bookService.deleteBook(id).subscribe(
        () => {
          this.loadBooks(); 
        },
        (error: any) => {
          console.error('فشل مسح الكتاب', error);
        }
      );
    }
  }

  viewDetails(bookId: number) {
    this.router.navigate([`/books/${bookId}/detail`]);
  }
}