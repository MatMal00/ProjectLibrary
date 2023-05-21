import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/shared/services/books.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CookieService],
})
export class LoginComponent {
  hide: boolean = true;

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _booksService: BooksService,
    private _router: Router,
    private _cookieService: CookieService
  ) {}

  get form() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      let login = {
        ...this.loginForm.value,
      };

      this._booksService.postAuthenticationLogin(login).subscribe({
        next: (loginRes: any) => {
          this._cookieService.set('AuthorizationToken', loginRes.accessToken);

          const user = {
            id: loginRes.id,
            firstName: loginRes.firstName,
            lastName: loginRes.lastName,
            email: loginRes.email,
            role: {
              id: loginRes.role.id,
              roleName: loginRes.role.roleName,
            },
          };

          window.localStorage.setItem('user', JSON.stringify(user));

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
