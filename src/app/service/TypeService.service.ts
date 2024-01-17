import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './ApiConfig.service';
@Injectable({
  providedIn: 'root',
})
export class TypeService {
  //private apiUrl = 'https://unique-zinc-production.up.railway.app';
  // private apiUrl = 'http://localhost:8000';
  private apiUrl = this.apiConfigService.getApiUrl();
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  getAllTypesCredit(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type-credits`);
  }

  getAllTypeFinancements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type-financements`);
  }
}
