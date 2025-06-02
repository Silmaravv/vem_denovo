// src/app/pages/admin/products/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngFor, *ngIf
import { Router, RouterLink } from '@angular/router'; // Para navegação (Router) e links (RouterLink)
import { Product, ProductService } from '../../../../core/services/product.service'; // Importe o serviço e a interface Product

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // Certifique-se que CommonModule e RouterLink estão aqui
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Array para armazenar os produtos

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts(); // Chama o método para carregar os produtos ao iniciar o componente
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Atribui os dados recebidos à array de produtos
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        // Opcional: Adicione aqui alguma lógica para mostrar um erro na UI, se desejar.
      }
    });
  }

  // MÉTODO PARA EXCLUIR PRODUTO
  // CORRIGIDO: O parâmetro 'id' agora aceita string OU number para corresponder ao ProductService
  deleteProduct(id: string | number): void {
    console.log('Botão excluir clicado para o ID:', id); // Log para depuração
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log(`Produto com ID ${id} excluído com sucesso.`);
          this.loadProducts(); // Recarrega a lista de produtos após a exclusão
        },
        error: (err) => {
          console.error(`Erro ao excluir produto com ID ${id}:`, err);
          // Opcional: Adicione aqui alguma lógica para mostrar um erro na UI, se desejar.
        }
      });
    }
  }

  // Método para navegar para a página de adição de produto
  goToAddProduct(): void {
    this.router.navigate(['/admin/products/new']);
  }
}