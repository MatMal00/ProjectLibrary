import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;

  loginForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private _formBuilder: FormBuilder, private _booksService: BooksService, private _router: Router) {}

  get form() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      let login = {
        ...this.loginForm.value,
      };

      this._booksService.postAuthenticationLogin(login).subscribe({
        next: (loginRes: object) => {
          window.localStorage.setItem('user', JSON.stringify(loginRes));
          this._router.navigate(['/']);
          setTimeout(() => {
            document.location.reload();
          }, 1000);
        },
        error: (error) => {
          alert(error.error);
        },
      });
    }
  }
}
