import { ApplicationConfig } from '@angular/core';
// Importe 'withInMemoryScrolling' junto com 'provideRouter'
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // <<<<<< ADICIONE ESTE BLOCO DE CONFIGURAÇÃO AQUI!
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Isso restaura a posição do scroll ao navegar para trás/frente
        anchorScrolling: 'enabled',         // Isso habilita a rolagem para os #IDs na URL (fragmentos)
      })
      // <<<<<< FIM DO BLOCO DE CONFIGURAÇÃO
    ),
    provideHttpClient()
  ]
};