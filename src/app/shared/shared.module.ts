import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './modules/material/material.module';
import { HeaderAnimateDirective } from './directives/header-animate.directive';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    HeaderAnimateDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgToastModule
  ],
  exports: [
    MaterialModule,
    HeaderAnimateDirective,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgToastModule
  ],
})
export class SharedModule { }
