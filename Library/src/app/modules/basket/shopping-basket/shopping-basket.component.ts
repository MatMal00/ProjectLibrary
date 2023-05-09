import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Users } from 'src/app/shared/models/users.model';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss'],
})
export class ShoppingBasketComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = ['imageUrl', 'title', 'author', 'categoryName', 'price', 'actions'];
  dataSource!: any;

  constructor(private _liveAnnouncer: LiveAnnouncer, private booksService: BooksService) {}

  public ngOnInit(): void {
    this.dataSource = JSON.parse(window.localStorage.getItem('order') || '[]');
  }

  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public removeFromBasket(orderId: number): void {
    this.dataSource = JSON.parse(window.localStorage.getItem('order') || '[]');

    this.dataSource.map((_: any, index: any) => {
      this.dataSource[index].id === orderId && this.dataSource.splice(index, 1);
    });

    localStorage.setItem('order', JSON.stringify(this.dataSource));

    this.booksService.orders.next(this.dataSource);
  }

  public goToPayment(orderId: number) {
    this.booksService.sendIdToPayment.next(orderId);
  }

  public goToRent(orderId: number) {
    this.booksService.sendIdToRent.next(orderId);
  }
}
