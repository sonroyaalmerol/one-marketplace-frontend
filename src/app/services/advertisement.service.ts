import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Advertisement } from '../models/advertisement.model';
import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';

const baseUrl = `${environment.apiBaseUrl}/advertisements`;
@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(baseUrl);
  }
  search(query: any): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${baseUrl}/search?query=${query}`);
  }
  get(id: any): Observable<any> {
    return this.http.get<Advertisement>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // questions

  getAnsweredQuestions(id: any): Observable<Question[]> {
    return this.http.get<Question[]>(`${baseUrl}/${id}/questions`);
  }
  getAllQuestions(id: any): Observable<Question[]> {
    return this.http.get<Question[]>(`${baseUrl}/${id}/questions/admin`);
  }
  getQuestion(id: any, questionId: any): Observable<Question> {
    return this.http.get<Question>(`${baseUrl}/${id}/questions/${questionId}`);
  }
  createQuestion(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/questions`, data);
  }
  deleteQuestion(id: any, questionId: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}/questions/${questionId}`);
  }

  // answers
  
  getAnswer(id: any, questionId: any): Observable<Answer> {
    return this.http.get<Answer>(`${baseUrl}/${id}/questions/${questionId}/answer`);
  }
  createAnswer(id: any, questionId: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/questions/${questionId}/answer`, data);
  }
  editAnswer(id: any, questionId: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/questions/${questionId}/answer`, data);
  }
  deleteAnswer(id: any, questionId: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}/questions/${questionId}/answer`);
  }
}
