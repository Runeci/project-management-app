import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
  exports: [
    HeaderComponent,
    WelcomePageComponent,
  ],
})
export class CoreModule { }
