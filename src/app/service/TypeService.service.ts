import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  getAllTypesCredit(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type-credits`);
  }

  getAllTypeFinancements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type-financements`);
  }
}
