import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './app/interceptors/baseUrlInterceptor';

bootstrapApplication(AppComponent,{
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([baseUrlInterceptor]))

  ],
}).catch((e) => console.error(e));
