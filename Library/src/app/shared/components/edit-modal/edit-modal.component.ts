import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categories } from '../../models/categories.model';
import { BooksService } from '../../services/books.service';
import { CategoriesConstants } from '../../constants/categories.constants';

export interface ModalData {
  id: number;
  title: string;
  author: string;
  categoryName: string;
  quantity: number;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  editForm = this._formBuilder.group({
    title: [`${this.modalValues.title}`],
    author: [`${this.modalValues.author}`],
    categoryName: [`${this.modalValues.categoryName}`],
    quantity: [`${this.modalValues.quantity}`],
  });

  id!: number;

  categories = CategoriesConstants.categories;

  constructor(
    public modalRef: MatDialogRef<ModalData>,
    @Inject(MAT_DIALOG_DATA) public modalValues: ModalData,
    private _formBuilder: FormBuilder,
    private _booksService: BooksService
  ) {}

  ngOnInit(): void {}

  public deleteBook(bookId: number): void {
    this._booksService.deleteBook(bookId).subscribe();
  }

  public save(bookId: number): void {
    const form = {
      id: this.modalValues.id,
      ...this.editForm.value,
    };

    this._booksService.editBook(bookId, form).subscribe();

    this.modalRef.close();
  }
}
