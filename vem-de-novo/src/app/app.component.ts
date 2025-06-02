import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterLink, RouterOutlet, Scroll, NavigationEnd } from '@angular/router'; // Importe NavigationEnd
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Vem de Novo';
  isAdminRoute: boolean = false; // Nova propriedade para controlar a visibilidade do rodapé

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupFragmentScrolling();
    this.checkAdminRoute(); // Chame o método para verificar a rota no início
  }

  private setupFragmentScrolling(): void {
    this.router.events.pipe(
      filter((e): e is Scroll => e instanceof Scroll)
    ).subscribe(e => {
      if (e.anchor) {
        const anchor = e.anchor;
        if (typeof anchor === 'string') {
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor(anchor);
            this.closeMobileMenu(); // Fecha o menu mobile após navegação
          }, 100);
        }
      } else if (e.position) {
        this.viewportScroller.scrollToPosition(e.position);
      } else {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  private checkAdminRoute(): void {
    // Escuta eventos de navegação para atualizar a flag isAdminRoute
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica se a URL começa com '/admin'
        this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin');
      }
    });
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  openMobileMenu(): void {
    document.body.classList.add('show-mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.classList.add('active');
    }
  }

  closeMobileMenu(): void {
    document.body.classList.remove('show-mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  }

  onNavLinkClick(): void {
    this.closeMobileMenu();
  }
}