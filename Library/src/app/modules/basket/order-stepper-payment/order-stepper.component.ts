import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BooksService } from 'src/app/shared/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-stepper',
  templateUrl: './order-stepper.component.html',
  styleUrls: ['./order-stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class OrderStepperComponent implements OnInit {
  userLogin: any;

  dataSource: any;

  bookId!: number;

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    lastName: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    address: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private booksService: BooksService, private _router: Router) {}

  public ngOnInit(): void {
    this.booksService.loginUser.subscribe((response: object | null) => {
      this.userLogin = response;
    });
  }

  public buyBook(): void {
    this.booksService.sendIdToPayment.subscribe((response) => {
      this.bookId = response;
    });

    let bodyRequest = {
      bookId: this.bookId,
      userId: this.userLogin.id,
    };

    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourthFormGroup.valid
    ) {
      this.booksService.postOrder(bodyRequest).subscribe({
        next: () => {
          alert('Book has been successfully bought!');
          this.dataSource = JSON.parse(window.localStorage.getItem('order') || '[]');

          this.dataSource.map((_: any, index: number) => {
            this.dataSource[index].id === this.bookId && this.dataSource.splice(index, 1);
          });

          localStorage.setItem('order', JSON.stringify(this.dataSource));

          this.booksService.orders.next(this.dataSource);

          this._router.navigate(['/']);
        },
      });
    }
  }
}
