import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './app/interceptors/baseUrlInterceptor';
import { provideGoogleId } from './app/google-login/google-login.config';
import { provideFacebookId } from './app/facebook-login/facebook-login.config';

bootstrapApplication(AppComponent,{
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideGoogleId('746820501392-nc4pet9ffnm8gq8hg005re9e6ho65nua.apps.googleusercontent.com'),
    provideFacebookId('752113449636427','v12.0')
  ],
}).catch((e) => console.error(e));
