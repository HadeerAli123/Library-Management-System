import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../book.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      if (!isNaN(id)) {
        this.bookService.getBook(id).subscribe(
          (data: Book) => {
            this.book = data;
            console.log('البيانات اللي جت:', data);
          },
          (error: any) => {
            console.error('فشل جلب الكتاب', error);
            this.book = undefined;
          }
        );
      } else {
        console.error('الـ ID مش عدد صحيح!');
        this.book = undefined;
      }
    } else {
      console.error('الـ ID مش موجود في المسار!');
      this.book = undefined;
    }
  }
}