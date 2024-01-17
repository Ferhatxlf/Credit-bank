// api-config.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  //apiUrl = 'http://localhost:8000'; // Set your API base URL here
  apiUrl = 'max-toe-production.up.railway.app';
  getApiUrl(): string {
    return this.apiUrl;
  }
}
