import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersRolesConstants } from '../../constants/users.constants';
import { BooksService } from '../../services/books.service';
import { CategoriesConstants } from '../../constants/categories.constants';

export interface EditUserModalData {
  id: number;
  firstName: string;
  lastname: string;
  email: string;
  roleName: string;
}

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent {
  id!: number;

  userRoles = UsersRolesConstants.usersRoles;

  editUserForm = this._formBuilder.group({
    firstName: [`${this.modalValues.firstName}`],
    lastname: [`${this.modalValues.lastname}`],
    roleName: [this.modalValues.roleName],
    email: [`${this.modalValues.email}`],
  });

  constructor(
    public modalRef: MatDialogRef<EditUserModalData>,
    @Inject(MAT_DIALOG_DATA) public modalValues: EditUserModalData,
    private _formBuilder: FormBuilder,
    private _booksService: BooksService
  ) {}

  public save(userId: number): void {
    const form = {
      id: this.modalValues.id,
      ...this.editUserForm.value,
    };

    this._booksService.editUsers(userId, form).subscribe();

    this.modalRef.close();
  }
}
