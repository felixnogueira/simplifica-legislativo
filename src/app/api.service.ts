import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { ChatResponse, Documento, Filtros } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  filtros(): Observable<Filtros> {
    return this.http.get<Filtros>(`${this.base}/api/filtros`);
  }

  docs(params: Record<string, string | number | undefined>): Observable<{ count: number; results: Documento[] }> {
    let p = new HttpParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== '') {
        p = p.set(k, String(v));
      }
    }
    return this.http.get<{ count: number; results: Documento[] }>(`${this.base}/api/docs`, { params: p });
  }

  chat(pergunta: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.base}/api/chat`, { pergunta });
  }

  health(): Observable<{ status: string; timestamp?: string }> {
    return this.http.get<{ status: string; timestamp?: string }>(`${this.base}/health`);
  }
}
