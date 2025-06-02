import { Component, OnInit } from '@angular/core';
// Importe TitleCasePipe e CurrencyPipe do CommonModule
import { CommonModule, TitleCasePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../../core/services/product.service'; // Caminho corrigido

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,   // Adicione TitleCasePipe aqui
    CurrencyPipe     // Adicione CurrencyPipe aqui
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.route.paramMap.subscribe(params => {
          this.currentCategory = params.get('category');
          this.filterProducts();
        });
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }

  filterProducts(): void {
    if (this.currentCategory && this.currentCategory !== 'all') {
      // Correção: Adicionado o operador de asserção não-nula (!) para currentCategory
      // A condição 'this.currentCategory' já garante que não é nulo aqui.
      this.filteredProducts = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(this.currentCategory!.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.allProducts];
    }
  }
}