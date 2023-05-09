import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLogin: any;

  showFiller: boolean = false;

  productsInBasket!: number;

  constructor(private _booksService: BooksService) {}

  public ngOnInit(): void {
    this._booksService.orders.subscribe((products) => {
      this.productsInBasket = products.length;
    });

    this.productsInBasket = JSON.parse(window.localStorage.getItem('order') || '[]').length;

    this.userLogin = JSON.parse(window.localStorage.getItem('user') || '{}');

    this._booksService.loginUser.next(this.userLogin);
  }

  public signOut(): void {
    this.userLogin = window.localStorage.removeItem('user');
    this.userLogin = window.localStorage.removeItem('order');

    this._booksService.loginUser.next({});
    this._booksService.orders.next([]);
  }
}
