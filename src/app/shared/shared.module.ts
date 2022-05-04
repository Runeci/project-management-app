import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
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
  ],
  exports: [
    MaterialModule,
    HeaderAnimateDirective,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
export class SharedModule { }
