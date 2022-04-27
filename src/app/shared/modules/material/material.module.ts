import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatIconModule,
    BrowserAnimationsModule,
  ]
})
export class MaterialModule { }
