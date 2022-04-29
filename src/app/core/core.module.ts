import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header/header.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    WelcomePageComponent,
  ],
})
export class CoreModule { }
