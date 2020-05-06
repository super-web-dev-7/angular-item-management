import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'ag-grid-community'; // <-- This will fix it.

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
