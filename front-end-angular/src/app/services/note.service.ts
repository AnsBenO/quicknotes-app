import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TNote } from '../types/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  API_URL = 'http://localhost:3003/api/notes';
  token!: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('authToken') as string;
  }
  private createAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getNotes(): Observable<TNote[]> {
    const headers = this.createAuthHeaders(this.token);
    return this.http.get<TNote[]>(this.API_URL, { headers });
  }

  getNote(id: string): Observable<TNote> {
    const headers = this.createAuthHeaders(this.token);
    return this.http.get<TNote>(`${this.API_URL}/${id}`, { headers });
  }

  createNote(note: { title: string; text: string }): Observable<TNote> {
    const headers = this.createAuthHeaders(this.token);
    return this.http.post<TNote>(this.API_URL, note, { headers });
  }

  updateNote(
    id: string,
    note: { title: string; text: string }
  ): Observable<TNote> {
    const headers = this.createAuthHeaders(this.token);
    return this.http.patch<TNote>(`${this.API_URL}/${id}`, note, { headers });
  }

  deleteNote(id: string): Observable<void> {
    const headers = this.createAuthHeaders(this.token);
    return this.http.delete<void>(`${this.API_URL}/${id}`, {
      headers,
    });
  }
}
