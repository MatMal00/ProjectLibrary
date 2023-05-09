import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Book } from 'src/app/shared/models/book.model';
import { BooksService } from 'src/app/shared/services/books.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'src/app/shared/components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  books?: Book[];

  categories!: Categories[];

  userLogin: any;
  ids!: string;

  array: object[] = [];

  selectFormControl: FormControl<string | null> = new FormControl('');

  constructor(private booksService: BooksService, public modal: MatDialog) {}

  public ngOnInit(): void {
    this._getBooksForSell();

    this.booksService.getCategories().subscribe((response: Categories[]) => {
      this.categories = response;
    });

    this.selectFormControl.valueChanges.subscribe((selectedValue: string | null) => {
      this.booksService.getBooks().subscribe((result: Book[]) => {
        this.books = result.filter((x: Book) => x.isRentable === false && x.categoryName === selectedValue);
      });
    });

    this.booksService.loginUser.subscribe((response: object | null) => {
      this.userLogin = response;
    });

    this.array = JSON.parse(window.localStorage.getItem('order') || '[]');
  }

  public addToBasketForBuy(book: Book): void {
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
      width: '450px',
    };

    const modalRef = this.modal.open(EditModalComponent, config);

    modalRef.afterClosed().subscribe(() => {
      this._getBooksForSell();
    });
  }

  private _getBooksForSell(): void {
    this.booksService.getBooks().subscribe((result: Book[]) => {
      this.books = result.filter((x: Book) => x.isRentable === false);
    });
  }
}
