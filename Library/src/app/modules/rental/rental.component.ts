import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { BooksService } from 'src/app/shared/services/books.service';
import { FormControl } from '@angular/forms';
import { Categories } from 'src/app/shared/models/categories.model';
import { EditModalComponent } from 'src/app/shared/components/edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss'],
})
export class RentalComponent implements OnInit {
  books?: Book[];
  categories!: Categories[];

  userLogin: any;

  selectFormControl = new FormControl('');

  array: object[] = [];

  constructor(private booksService: BooksService, public modal: MatDialog) {}

  public ngOnInit(): void {
    this._getBooksForRent();

    this.booksService.getCategories().subscribe((response: Categories[]) => {
      this.categories = response;
    });

    this.selectFormControl.valueChanges.subscribe((selectedValue: string | null) => {
      this.booksService.getBooks().subscribe((result: Book[]) => {
        this.books = result.filter((x: Book) => x.isRentable === true && x.categoryName === selectedValue);
      });
    });

    this.booksService.loginUser.subscribe((response: object | null) => {
      this.userLogin = response;
    });
    this.array = JSON.parse(window.localStorage.getItem('order') || '[]');
  }

  public addToBasketForRent(book: Book): void {
    this.array.push(book);

    window.localStorage.setItem('order', JSON.stringify(this.array));

    this.booksService.orders.next(this.array);
  }

  public editMode(book: Book): void {
    const config = {
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        categoryName: book.categoryName,
        quantity: book.quantity,
      },
      height: '410px',
      width: '500px',
    };

    const modalRef = this.modal.open(EditModalComponent, config);

    modalRef.afterClosed().subscribe(() => {
      this._getBooksForRent();
    });
  }

  private _getBooksForRent(): void {
    this.booksService.getBooks().subscribe((result: Book[]) => {
      this.books = result.filter((x: Book) => x.isRentable === true);
    });
  }
}
