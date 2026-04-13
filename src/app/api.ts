import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment';

export interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = environment.apiUrl; // 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`);
  }
}