// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Defina a interface para o produto
export interface Product {
  id?: string | number; // CORRIGIDO: id pode ser string OU number, pois o json-server pode gerar ambos
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  artisanId: number; // Para vincular ao artesão
  category?: string; // Adicionado como opcional, caso você use categorias
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; // URL do endpoint de produtos

  constructor(private http: HttpClient) { }

  // Método para obter todos os produtos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Método para obter um produto por ID
  // CORRIGIDO: id é string | number
  getProduct(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Método para adicionar um novo produto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Método para atualizar um produto existente
  updateProduct(product: Product): Observable<Product> {
    // É importante que o produto tenha um ID para ser atualizado
    if (product.id === undefined) {
      // Você pode lançar um erro ou retornar um Observable de erro, dependendo da sua estratégia
      console.error('Erro: ID do produto não pode ser undefined para atualização.');
      throw new Error('ID do produto é necessário para atualização.');
    }
    // CORRIGIDO: Uso correto do template literal para incluir o ID na URL
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // Método para deletar um produto
  // CORRIGIDO: id é string | number
  deleteProduct(id: string | number): Observable<void> {
    // CORRIGIDO: Uso correto do template literal para incluir o ID na URL
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}