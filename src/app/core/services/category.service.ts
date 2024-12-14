import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AutenticacaoService, DefaultResponse } from './autenticacao.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly baseUrl = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) {}

  findAll(): Observable<Category[]> {
    const token = this.autenticacaoService.usuarioLogado?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.get<Category[]>(`${this.baseUrl}/category/get`, { headers });
  }

  addCategory(category: Category): Observable<DefaultResponse> {
    const token = this.autenticacaoService.usuarioLogado?.token;
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.httpClient.post<DefaultResponse>(`${this.baseUrl}/category/add`, category, { headers });
  }

  updateCategory(category: Category): Observable<DefaultResponse> {
    const token = this.autenticacaoService.usuarioLogado?.token;
    const headers = { Authorization: `Bearer ${token}` };
  
    return this.httpClient.patch<DefaultResponse>(`${this.baseUrl}/category/update`, category, { headers });
  }
}
