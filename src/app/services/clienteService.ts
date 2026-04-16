import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment';

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

export class ClienteService {

  //private baseUrl = 'http://localhost:8080';
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  listarClientes(token: string = ''): Observable<Cliente[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes`, { headers }
    );
  }
}