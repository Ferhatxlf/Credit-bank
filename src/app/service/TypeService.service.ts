import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './ApiConfig.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService {

  private apiUrl = this.apiConfigService.getApiUrl();

  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {}

 
  private getHeaders(): HttpHeaders {
    // Retrieve the user object from local storage
    const currentUserString = localStorage.getItem('currentUser');
  
    // Check if currentUserString is not null before parsing
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  
    // Retrieve the token from the user object or set it to an empty string if not present
    const token = currentUser && currentUser.token ? currentUser.token : '';
  
    // Set headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }
  
    

  getAllTypesCredit(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/type-credits`, { headers });
  }

  getAllTypeFinancements(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/type-financements`, { headers });
  }
}
