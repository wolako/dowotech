import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'teckruns-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private menuHoverTimeout: any;
  private observer!: IntersectionObserver;

  navbarColor = 'blue-bg';
  showSubMenu = false;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  menus = [
    { path: '/', name: 'Accueil' },
    { path: '/about', name: 'À Propos' },
    { 
      name: 'Services',
      subItems: [
        { path: '/developpement', name: 'Développement d\'Apps' },
        { path: '/infrastructure-it', name: 'Infrastructure Réseau' },
        { path: '/devops', name: 'Automatisation DevOps' },
        { path: '/gestion-cloud', name: 'Gestion Cloud' }
      ]
    },
    { path: '/contact', name: 'Contactez-Nous' }
  ];

  socials = [
    { icon: 'facebook', link: '#' },
    { icon: 'linkedin', link: '#' },
    { icon: 'mail', link: '#' }
  ];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('scroll', this.handleTopScroll);
  }

  ngAfterViewInit() {
    this.handleTopScroll = this.handleTopScroll.bind(this);
    window.addEventListener('scroll', this.handleTopScroll);
  }

  private handleTopScroll() {
    this.ngZone.run(() => {
      if (window.scrollY < 100) {
        this.navbarColor = 'blue-bg';
      } else {
        this.navbarColor = 'transparent-white-text';
      }
    });
  }

  handleMenuHover(shouldOpen: boolean): void {
    clearTimeout(this.menuHoverTimeout);
    
    if(shouldOpen) {
      this.menuTrigger.openMenu();
    } else {
      this.menuHoverTimeout = setTimeout(() => {
        if(!this.isMouseOverMenu()) {
          this.menuTrigger.closeMenu();
        }
      }, 300); // Délai de 300ms
    }
  }

  private isMouseOverMenu(): boolean {
    const menuPanel = document.querySelector('.menu-panel');
    return menuPanel?.matches(':hover') || false;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.showSubMenu = false;
    if (this.sidenav) this.sidenav.close();
  }

  toggleSubMenu(): void {
    this.showSubMenu = !this.showSubMenu;
    const items = document.querySelector('.submenu-items');
    items?.classList.toggle('show');
    this.cdRef.detectChanges();
  }
}