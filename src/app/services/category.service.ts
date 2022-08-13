import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Advertisement } from '../models/advertisement.model';
import { Category } from '../models/category.model';

const baseUrl = `${environment.apiBaseUrl}/categories`;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
  }
  getAdvertisements(id: any): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${baseUrl}/${id}/advertisements`);
  }
}
