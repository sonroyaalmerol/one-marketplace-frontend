import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advertisement } from '../models/advertisement.model';

const baseUrl = `${environment.apiBaseUrl}/users`;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  get(id: any): Observable<any> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  getAdvertisements(id: any): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${baseUrl}/${id}/advertisements`);
  }
}
