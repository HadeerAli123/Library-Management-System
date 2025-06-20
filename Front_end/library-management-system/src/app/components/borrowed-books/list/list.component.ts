import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowedBookService } from '../../../services/borrowed-book.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  borrowedBooks: any[] = [];

  constructor(private borrowedBookService: BorrowedBookService) {}

  ngOnInit() {
    this.borrowedBookService.getMyBorrowedBooks().subscribe(data => {
      this.borrowedBooks = data;
    }, error => console.error('Error fetching borrowed books', error));
  }
}