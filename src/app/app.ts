import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClienteService, Cliente } from './services/clienteService';
import { AuthService, User } from './services/authService';
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
  user: User = { email: '', passwrd: ''};
  clientesFiltrados: Cliente[] = [];
  filtroNome: string = '';
  token: string = '';
  loading = false;
  showLogin = false;

  constructor(private clienteService: ClienteService, private cdr: ChangeDetectorRef, public authService: AuthService) {
  }

  ngOnInit(): void {
      this.buscar();
  }

   buscar() {
  this.loading = true;

  this.token = '';

  if (this.showLogin) {
    this.token = this.authService.getToken() ?? '';
  }

  this.clienteService.listarClientes(this.token)
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

  async login() {
  this.authService.login(this.user.email, this.user.passwrd)
    .subscribe(res => {
      this.authService.saveToken(res.idToken);
      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
  }
}

