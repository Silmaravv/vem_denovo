import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Importamos o BehaviorSubject para gerenciar o estado
import { StyleItem } from '../models/style-item.model'; // Importamos a interface que criamos
import { v4 as uuidv4 } from 'uuid'; // Importamos 'uuid' para gerar IDs únicos

@Injectable({
  providedIn: 'root'
})
export class StyleItemService {
  // Chave para armazenar/recuperar os dados no localStorage
  private STYLE_ITEMS_KEY = 'styleItems';

  // BehaviorSubject: Armazena a lista atual de StyleItems e notifica os componentes quando ela muda.
  // Começa com uma lista vazia. O '_' é uma convenção para propriedades privadas.
  private _styleItems = new BehaviorSubject<StyleItem[]>([]);

  // Observable público: Os componentes se inscreverão neste Observable para receber a lista de itens.
  // Ele permite que os componentes "ouçam" as mudanças sem ter acesso direto ao BehaviorSubject.
  styleItems$: Observable<StyleItem[]> = this._styleItems.asObservable();

  constructor() {
    // Quando o serviço é criado (iniciado), tentamos carregar os itens do localStorage.
    this.loadStyleItems();
  }

  // --- Métodos Internos para Gerenciar o Estado (uso principal do serviço) ---

  // Carrega os itens do localStorage.
  private loadStyleItems(): void {
    const items = localStorage.getItem(this.STYLE_ITEMS_KEY);
    if (items) {
      // Se houver itens, os converte de volta para objetos JavaScript e os define como valor atual do BehaviorSubject.
      this._styleItems.next(JSON.parse(items));
    } else {
      // Se não houver nada no localStorage, define uma lista de itens padrão.
      this.setDefaultStyleItems();
    }
  }

  // Salva a lista atual de itens no localStorage e notifica os "ouvintes" (componentes).
  private saveStyleItems(items: StyleItem[]): void {
    localStorage.setItem(this.STYLE_ITEMS_KEY, JSON.stringify(items)); // Converte a lista para string JSON
    this._styleItems.next(items); // Emite a lista atualizada para quem estiver inscrito em 'styleItems$'
  }

  // Define uma lista inicial de itens se o localStorage estiver vazio.
  private setDefaultStyleItems(): void {
    const defaultItems: StyleItem[] = [
      // Cada objeto aqui segue a estrutura definida na interface StyleItem
      { id: uuidv4(), name: 'Vestidos', description: 'Vestidos exclusivos direto do estúdio pro seu estilo.', imageUrl: 'assets/images/v5.png' },
      { id: uuidv4(), name: 'Conjuntos', description: 'Conjuntos únicos, do nosso ateliê direto para o seu visual.', imageUrl: 'assets/images/conjunto.png' },
      { id: uuidv4(), name: 'Trench Coat', description: 'Abrace o seu estilo com a criatividade única dos nossos trench coats', imageUrl: 'assets/images/TrenchCoat.png' },
      { id: uuidv4(), name: 'Saias', description: 'Sinta a originalidade em cada fio das nossas saias feita a mão', imageUrl: 'assets/images/saia.png' },
      { id: uuidv4(), name: 'Macacão', description: 'Entre no universo dos macacões exclusivos Vem de Novo!', imageUrl: 'assets/images/macacao.png' },
      { id: uuidv4(), name: 'Outros', description: 'Outras joias raras te esperam. Descubra!', imageUrl: 'assets/images/outros.png' },
    ];
    this.saveStyleItems(defaultItems); // Salva esses itens padrão
  }

  // --- Métodos CRUD (Criar, Ler, Atualizar, Excluir) para Componentes ---

  // Retorna um Observable da lista de itens. Componentes se inscrevem nele.
  getStyleItems(): Observable<StyleItem[]> {
    return this.styleItems$;
  }

  // Busca um item pelo ID. 'of()' transforma um valor em um Observable.
  getStyleItemById(id: string): Observable<StyleItem | undefined> {
    const currentItems = this._styleItems.getValue(); // Pega a lista atual diretamente do BehaviorSubject
    return of(currentItems.find(item => item.id === id)); // Retorna o item encontrado (ou undefined)
  }

  // Adiciona um novo item à lista.
  addStyleItem(item: StyleItem): void {
    const currentItems = this._styleItems.getValue(); // Pega a lista atual
    const newItem = { ...item, id: uuidv4() }; // Cria um novo item, adicionando um ID único
    this.saveStyleItems([...currentItems, newItem]); // Adiciona o novo item e salva a lista atualizada
  }

  // Atualiza um item existente na lista.
  updateStyleItem(updatedItem: StyleItem): void {
    const currentItems = this._styleItems.getValue();
    const updatedList = currentItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item // Se o ID for igual, substitui o item; senão, mantém o original
    );
    this.saveStyleItems(updatedList); // Salva a lista atualizada
  }

  // Exclui um item da lista pelo ID.
  deleteStyleItem(id: string): void {
    const currentItems = this._styleItems.getValue();
    const filteredList = currentItems.filter(item => item.id !== id); // Filtra removendo o item com o ID especificado
    this.saveStyleItems(filteredList); // Salva a lista filtrada
  }
}