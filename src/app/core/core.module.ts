import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header/header.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
    UserProfileComponent,
    ConfirmComponent,
    FooterComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    HeaderComponent,
    WelcomePageComponent,
    UserProfileComponent,
    ConfirmComponent,
    FooterComponent,
  ],
})
export class CoreModule {}
