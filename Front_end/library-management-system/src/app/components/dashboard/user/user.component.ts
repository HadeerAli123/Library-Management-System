import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedBookService } from '../../../services/borrowed-book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  borrowedBooks: any[] = [];

  constructor(private borrowedBookService: BorrowedBookService, private router: Router) {}

  ngOnInit() {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks() {
    this.borrowedBookService.getMyBorrowedBooks().subscribe(data => {
      this.borrowedBooks = data;
    }, error => console.error('فشل جلب الكتب المقترضة', error));
  }

  borrowBook() {
    this.router.navigate(['/books']); 
  }
}