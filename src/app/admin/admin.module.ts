import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { CommonDirectiveModule } from 'src/directives/commondirective.module';
@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularSplitModule,
    MaterialModule,
    CommonDirectiveModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent }
    ])
  ],
  exports: [AdminComponent]
})
export class AdminModule {}
