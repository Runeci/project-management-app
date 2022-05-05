import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';
import { WelcomePageComponent } from './pages/welcome/welcome-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
    UserProfileComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
  exports: [
    HeaderComponent,
    WelcomePageComponent
  ],
})
export class CoreModule { }
