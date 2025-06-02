import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para standalone
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router'; // Importe Router para redirecionamento

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private router: Router) { } // O Router já está injetado

  logout(): void {
    this.authService.logout();
  }

  // NOVO MÉTODO: Navega para a rota de produtos
  goToProducts(): void {
    this.router.navigate(['/admin/products']);
  }
}