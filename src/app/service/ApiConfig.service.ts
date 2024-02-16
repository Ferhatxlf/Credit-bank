// api-config.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
 //apiUrl = 'http://localhost:8000';
 // apiUrl = 'https://creditdirectbackvdeploy-production.up.railway.app';
 apiUrl = 'https://credit-direct.onrender.com';


  getApiUrl(): string {
    return this.apiUrl;
  }
}
