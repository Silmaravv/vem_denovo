import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL base do seu JSON Server
  private loggedInStatus = false;

  constructor(private http: HttpClient, private router: Router) {
    // Inicializa o status de login baseado no localStorage (para persistir o login entre sessões)
    this.loggedInStatus = !!localStorage.getItem('isLoggedIn');
  }

  // Método de login: tenta autenticar o usuário
  login(username: string, password: string): Observable<boolean> {
    // Faz uma requisição GET para /users, filtrando pelo username
    return this.http.get<any[]>(`${this.apiUrl}/users?username=${username}`).pipe(
      map(users => {
        const user = users[0]; // Pega o primeiro usuário encontrado (JSON Server retorna um array)
        // VERIFIQUE ESTA LINHA: Garante que o usuário existe E que a senha corresponde
        if (user && user.password === password) { // <--- AQUI A SENHA É COMPARADA
          this.loggedInStatus = true;
          localStorage.setItem('isLoggedIn', 'true'); // Armazena o status de login
          return true; // Login bem-sucedido
        } else {
          this.loggedInStatus = false;
          return false; // Credenciais inválidas
        }
      }),
      catchError(error => {
        // Lida com erros na requisição HTTP
        console.error('Erro na requisição de login:', error);
        this.loggedInStatus = false;
        return of(false); // Retorna falso em caso de erro
      })
    );
  }

  // Método de logout
  logout(): void {
    this.loggedInStatus = false;
    localStorage.removeItem('isLoggedIn'); // Remove o status de login
    this.router.navigate(['/admin/login']); // Redireciona para a página de login
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return this.loggedInStatus || !!localStorage.getItem('isLoggedIn');
  }
}
