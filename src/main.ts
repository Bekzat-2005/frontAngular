import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './app/login/login.component';
import { AdminComponent } from './app/admin/admin.component';
import { AuthGuard } from './app/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, FormsModule),
    provideAnimations(),
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'login' }
    ])
  ]
});
