export interface StyleItem {
  id: string;          // Identificador único para cada item (ex: 'vestidos', 'conjuntos'). Será gerado automaticamente.
  name: string;        // O nome/título do item (ex: 'Vestidos', 'Conjuntos', 'Trench Coat').
  description: string; // A pequena descrição do item (ex: 'Vestidos exclusivos direto do estúdio...').
  imageUrl: string;    // A URL da imagem do item (ex: 'assets/images/v5.png').
}