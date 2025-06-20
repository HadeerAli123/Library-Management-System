import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../../../services/book.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../book.interface'; 

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditBookComponent implements OnInit {
  editForm!: FormGroup;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    if (isNaN(this.bookId)) {
      console.error('الـ ID مش صحيح أو مش موجود!');
      this.router.navigate(['/dashboard/admin']);
    }

    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      publication_date: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (!isNaN(this.bookId)) {
      this.bookService.getBook(this.bookId).subscribe(
        (data: Book) => {
          if (data) {
            this.editForm.patchValue({
              title: data.title || '',
              author: data.author || '',
              isbn: data.isbn || '',
              publication_date: data.publication_date ? new Date(data.publication_date).toISOString().split('T')[0] : ''
            });
            console.log('البيانات اللي جت:', data); // للتحقق
          } else {
            console.error('لا يوجد بيانات للكتاب!');
            this.router.navigate(['/dashboard/admin']);
          }
        },
        (error: any) => {
          console.error('فشل جلب الكتاب', error);
          this.router.navigate(['/dashboard/admin']);
        }
      );
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedBook: Book = this.editForm.value;
      this.bookService.updateBook(this.bookId, updatedBook).subscribe(
        (response: any) => {
          console.log('تم تحديث الكتاب', response);
          this.router.navigate(['/dashboard/admin']);
        },
        (error: any) => {
          console.error('فشل تحديث الكتاب', error);
        }
      );
    }
  }
}