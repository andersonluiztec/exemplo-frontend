import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService, Cliente } from './api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  filtroNome: string = '';
  loading = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
      this.buscar();
  }

   buscar() {
  this.loading = true;
  
  this.apiService.listarClientes()
    .subscribe(data => {
      this.clientes = data;
      this.aplicarFiltro();
      this.cdr.detectChanges();
    });
    this.loading = false;

  }

  aplicarFiltro() {
  this.clientesFiltrados = this.clientes;
  const filtro = this.filtroNome.toLowerCase();
  
  if (filtro) {
    this.clientesFiltrados = this.clientes.filter(c =>
      c.id.toString().includes(filtro) ||
      c.nome.toLowerCase().includes(filtro) ||
      c.endereco.toLowerCase().includes(filtro) ||
      c.bairro.toLowerCase().includes(filtro) ||
      c.cidade.toLowerCase().includes(filtro) ||
      c.estado.toLowerCase().includes(filtro) ||
      c.cep.toString().includes(filtro) 
    );
  }

  console.log(this.clientesFiltrados);

  }
}

