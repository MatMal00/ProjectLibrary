import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from './shared/components/edit-modal/edit-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CapitalLetterFirstPipe } from './shared/pipes/capital-letter-first.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { EditUserModalComponent } from './shared/components/edit-user-modal/edit-user-modal.component';

@NgModule({
  declarations: [NavbarComponent, EditModalComponent, CapitalLetterFirstPipe, EditUserModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  exports: [
    NavbarComponent,
    EditModalComponent,
    MatInputModule,
    CapitalLetterFirstPipe,
    MatTooltipModule,
    EditUserModalComponent,
  ],
})
export class SharedModule {}
