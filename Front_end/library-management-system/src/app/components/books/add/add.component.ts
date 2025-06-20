import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../../../services/book.service'; 
import { Router } from '@angular/router';
import { Book } from '../../../book.interface'; 

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddBookComponent {
  addForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public router: Router
  ) {
    this.addForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      publication_date: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const newBook: Book = this.addForm.value;
      this.bookService.addBook(newBook).subscribe(
        (response: any) => {
          console.log('تم إضافة الكتاب', response);
          this.router.navigate(['/dashboard/admin']);
        },
        (error: any) => {
          console.error('فشل إضافة الكتاب', error);
        }
      );
    }
  }
}