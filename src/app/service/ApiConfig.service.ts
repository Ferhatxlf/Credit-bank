// api-config.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  // apiUrl = 'http://localhost:8000';
  apiUrl = 'https://ablaze-groovy-bactrosaurus.glitch.me';
  //'https://backendcreditdirect-laarbi-production.up.railway.app';
  

  //apiUrl = 'https://creditdirect2.onrender.com';

  getApiUrl(): string {
    return this.apiUrl;
  }
}
