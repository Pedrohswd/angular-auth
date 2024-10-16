import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAutenticado: boolean = this.getAuthStatus();
  private userRole: string | null = null; // Armazena o papel do usuário

  constructor(private router: Router) {
    this.userRole = this.getUserRole(); // Recupera o papel do usuário ao iniciar
  }

  login(username: string, password: string) {
    if (username && password) {
      if (username === 'admin' && password === 'admin') {
        this.setAuthState(true,'adm'); // Define o papel como admin
        this.router.navigate(['/home']);
        return true;
      } else if (username === 'gerente' && password === 'gerente') {
        this.setAuthState(true,'gerente'); // Define o papel como gerente
        this.router.navigate(['/home']);
        return true;
      } else if (username === 'user' && password === 'user') {
        this.setAuthState(true,'usuario'); // Define o papel como usuário comum
        this.router.navigate(['/home']);
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
    this.setAuthState(false, null)
    this.router.navigate(['/']);
  }

  private setAuthState(authStatus: boolean, role: string | null): void {
    this.isAutenticado = authStatus;
    this.userRole = role;
    localStorage.setItem('userRole', JSON.stringify(role));
    localStorage.setItem('authStatus', JSON.stringify(authStatus));
  }

  private getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  private getUserRole(): string | null {
    return JSON.parse(localStorage.getItem('userRole') || 'null');
  }

  getRole(): string | null {
    return this.userRole;
  }
}
