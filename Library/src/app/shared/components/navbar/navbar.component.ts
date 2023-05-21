import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLogin: any;

  showFiller: boolean = false;

  productsInBasket!: number;

  authorizationToken!: boolean;

  constructor(private _booksService: BooksService, private _cookieService: CookieService) {}

  public ngOnInit(): void {
    this._booksService.orders.subscribe((products) => {
      this.productsInBasket = products.length;
    });

    this.authorizationToken = this._cookieService.get('AuthorizationToken') ? true : false;

    this.productsInBasket = JSON.parse(window.localStorage.getItem('order') || '[]').length;
    this.userLogin = JSON.parse(window.localStorage.getItem('user') || '{}');

    this._booksService.loginUser.next(this.userLogin);
  }

  public signOut(): void {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('order');

    this._cookieService.delete('AuthorizationToken');

    this._booksService.loginUser.next({});
    this._booksService.orders.next([]);

    this.ngOnInit();
  }
}
