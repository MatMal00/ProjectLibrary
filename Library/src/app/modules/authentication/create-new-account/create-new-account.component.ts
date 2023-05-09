import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.scss'],
})
export class CreateNewAccountComponent {
  createAccountForm: FormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private booksService: BooksService, private _router: Router) {}

  get form() {
    return this.createAccountForm.controls;
  }

  public createUserSubmit(): void {
    const newUserAccountValue = {
      ...this.createAccountForm.value,
    };

    if (this.createAccountForm.valid) {
      this.booksService.postAuthenticationRegister(newUserAccountValue).subscribe({
        next: () => {
          alert('Account has been successfully created');
          this._router.navigate(['/login']);
        },
        error: (error) => {
          alert(error.error);
        },
      });
    }
  }
}
