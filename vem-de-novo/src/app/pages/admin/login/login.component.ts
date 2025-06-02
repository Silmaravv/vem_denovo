import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas comuns do Angular (ex: *ngIf)
import { FormsModule } from '@angular/forms'; // <<<< IMPORTANTE: Necessário para [(ngModel)]
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router'; // Importa o Router para navegação

@Component({
  selector: 'app-login', // Seletor do componente
  standalone: true, // Define como componente standalone
  imports: [
    CommonModule,
    FormsModule // <<<< Adicione FormsModule aqui para habilitar two-way data binding
  ],
  templateUrl: './login.component.html', // Caminho para o template HTML
  styleUrl: './login.component.scss' // Caminho para o arquivo de estilos SCSS
})
export class LoginComponent {
  // Propriedades para armazenar os valores dos campos do formulário
  username = '';
  password = '';
  errorMessage = ''; // Propriedade para exibir mensagens de erro

  // Injeta o AuthService e o Router no construtor
  constructor(private authService: AuthService, private router: Router) { }

  // Método chamado quando o formulário é submetido
  onSubmit(): void {
    this.errorMessage = ''; // Limpa qualquer mensagem de erro anterior

    // Chama o método login do AuthService
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          // Se o login for bem-sucedido, navega para o dashboard do admin
          this.router.navigate(['/admin/dashboard']);
        } else {
          // Se as credenciais forem inválidas, define uma mensagem de erro
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        }
      },
      error => {
        // Em caso de erro na requisição (ex: JSON Server não está rodando)
        this.errorMessage = 'Ocorreu um erro ao tentar fazer login. Verifique o servidor.';
        console.error('Erro no login:', error);
      }
    );
  }
}
