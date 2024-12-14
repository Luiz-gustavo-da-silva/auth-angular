import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginForm } from '../models/login-form';
import { StorageService } from './storage.service';
import { SignupForm } from '../models/signup-form';
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'auth.token';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  readonly baseUrl = 'http://localhost:8080';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
  ) {}

  obterToken(login: LoginForm): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/user/login`, login);
  }

  login(login: LoginForm): Observable<void> {
    return this.obterToken(login).pipe(
      map((it) => this.storageService.put(TOKEN_KEY, it)),
    );
  }

  logout() {
    this.storageService.put(TOKEN_KEY, {});
  }

  isUsuarioLogado(): boolean {
    return this.usuarioLogado?.token != null;
  }

  get usuarioLogado(): AuthResponse | null {
    return this.storageService.get(TOKEN_KEY);
  }

  signup(signup: SignupForm):Observable<SignupResponse> {
    console.log(signup);
    return this.httpClient.post<SignupResponse>(`${this.baseUrl}/user/signup`, signup);
  }

  getRole(): string | null {
    const authResponse = this.usuarioLogado;
    if (!authResponse?.token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(authResponse.token);
      return decodedToken.role;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}

interface AuthResponse {
  token: string;
}

interface SignupResponse{
  massage: string;
}