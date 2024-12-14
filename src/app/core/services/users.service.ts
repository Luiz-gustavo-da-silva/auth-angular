import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticacaoService, DefaultResponse } from './autenticacao.service';
import { User } from '../models/user-interface copy';
import { Observable } from 'rxjs';
import { Status } from '../models/status-interface';
import { ChangePassword } from '../models/changepassword-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly baseUrl = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) {}

  findAll(): Observable<User[]> {
    const token = this.autenticacaoService.usuarioLogado?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.get<User[]>(`${this.baseUrl}/user/get`, { headers });
  }

  updateStatus(status: Status): Observable<DefaultResponse> {
    const token = this.autenticacaoService.usuarioLogado?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.patch<DefaultResponse>(
      `${this.baseUrl}/user/update`,
      status,
      { headers }
    );
  }

  changePassword(form: ChangePassword): Observable<DefaultResponse>{
    const token = this.autenticacaoService.usuarioLogado?.token;
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient.post<DefaultResponse>(
      `${this.baseUrl}/user/changePassword`,
      form,
      { headers }
    );
  }
}
