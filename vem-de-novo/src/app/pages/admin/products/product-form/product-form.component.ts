// src/app/pages/admin/products/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf
import { FormsModule } from '@angular/forms'; // Necessário para [(ngModel)]
import { ActivatedRoute, Router } from '@angular/router'; // Para obter parâmetros da rota e navegar
import { Product, ProductService } from '../../../../core/services/product.service'; // Importe o serviço e a interface

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Certifique-se que CommonModule e FormsModule estão aqui
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  // CORRIGIDO: productId pode ser string | number | null para refletir a interface Product
  // e o fato de que IDs do JSON Server podem ser strings.
  productId: string | number | null = null;

  product: Product = { // Objeto do produto com valores iniciais para o formulário
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    artisanId: 1 // Valor inicial para o ID do artesão
    // Não inclua 'id' aqui inicialmente para novos produtos; ele será preenchido ao carregar para edição.
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute, // Para acessar parâmetros da URL
    private productService: ProductService,
    private router: Router // Para navegação
  ) { }

  ngOnInit(): void {
    // Pega o 'id' da rota (se existir, significa que é edição)
    this.route.paramMap.subscribe(params => {
      // CORRIGIDO: Pega o 'id' como string. Ele pode ser um número, mas virá como string da URL.
      const idParam = params.get('id');
      if (idParam) {
        // Atribui o ID da URL diretamente para 'productId'.
        // Como a interface Product e o ProductService aceitam string | number,
        // não é mais necessária a conversão '+id' que pode causar problemas com IDs string.
        this.productId = idParam;
        this.loadProduct(this.productId); // Carrega o produto para edição
      }
    });
  }

  // CORRIGIDO: O parâmetro 'id' agora aceita string | number para corresponder ao ProductService.
  loadProduct(id: string | number): void {
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data; // Isso é CRÍTICO! O objeto 'product' agora inclui o ID carregado do serviço.
        console.log('Produto carregado para edição:', this.product); // Para depuração
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar produto: ' + (err.message || 'Erro desconhecido.');
        console.error('Erro ao carregar produto:', err);
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.productId) {
      // É uma edição:
      // CRUCIAL: Garante que o ID do produto está no objeto 'product' antes de enviar para atualização.
      // Embora 'this.product = data;' em loadProduct já devesse fazer isso, esta linha é uma segurança.
      this.product.id = this.productId;

      console.log('Tentando atualizar produto:', this.product); // Para depuração
      this.productService.updateProduct(this.product).subscribe({
        next: (data) => {
          this.successMessage = 'Produto atualizado com sucesso!';
          console.log('Produto atualizado com sucesso:', data);
          this.router.navigate(['/admin/products']); // Redireciona para a lista de produtos
        },
        error: (err) => {
          this.errorMessage = 'Erro ao atualizar produto: ' + (err.message || 'Erro desconhecido.');
          console.error('Erro ao atualizar produto:', err);
        }
      });
    } else {
      // É uma adição:
      console.log('Tentando adicionar novo produto:', this.product); // Para depuração
      this.productService.addProduct(this.product).subscribe({
        next: (data) => {
          this.successMessage = 'Produto adicionado com sucesso!';
          console.log('Produto adicionado com sucesso:', data);
          // Limpa o formulário após adicionar, para permitir adicionar outro sem recarregar.
          this.product = { name: '', description: '', price: 0, imageUrl: '', artisanId: 1 };
          this.router.navigate(['/admin/products']); // Redireciona para a lista de produtos
        },
        error: (err) => {
          this.errorMessage = 'Erro ao adicionar produto: ' + (err.message || 'Erro desconhecido.');
          console.error('Erro ao adicionar produto:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/products']); // Volta para a lista de produtos
  }
}