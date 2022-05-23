import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { NgToastModule } from 'ng-angular-popup';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './modules/material/material.module';
import { HeaderAnimateDirective } from './directives/header-animate.directive';

@NgModule({
  declarations: [
    HeaderAnimateDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgToastModule,
    NgxSpinnerModule,
  ],
  exports: [
    MaterialModule,
    HeaderAnimateDirective,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgToastModule,
    NgxSpinnerModule,
  ],
})
export class SharedModule { }
