// api-config.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
 // apiUrl = 'http://localhost:8000'; // Set your API base URL here

 apiUrl = 'https://observant-shock-production.up.railway.app';

  getApiUrl(): string {
    return this.apiUrl;
  }
}
