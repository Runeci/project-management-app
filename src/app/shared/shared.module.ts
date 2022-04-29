import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { HeaderAnimateDirective } from './directives/header-animate.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderAnimateDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    HeaderAnimateDirective,
  ],
})
export class SharedModule { }
