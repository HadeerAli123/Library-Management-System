import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService }  from '../../../services/book.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    }, error => console.error('Error fetching books', error));
  }
}