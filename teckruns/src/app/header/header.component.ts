import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ServicesComponent } from '../services/services.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'teckruns-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menus = [
    {
      path: '/', Component: HomeComponent,
      name: 'Acceuil'
    },
    {
      path: '/about', Component: AboutComponent,
      name: 'A Propos'
    },
    {  
      subItems: [
        {
          path: '/developpement',
          name: 'Développement'
        },
        {
          path: '/infrastructure-it',
          name: 'InfrastructureIT'
        },
        {
          path: '/devops',
          name: 'DevOps'
        },
        {
          path: '/gestion-cloud',
          name: 'Gestion Cloud'
        }
      ],
    },
    {
      path: '/contact', Component: ContactComponent,
      name: 'Contactez-Nous'
    }
  ]

  constructor(private router: Router){}

  ngOnInit(): void {}
  
  showSubMenu: boolean = false;

  toggleSubMenu() {
    this.showSubMenu = !this.showSubMenu;
  }
   navigateAndCloseOffcanvas(path: string) {
    this.showSubMenu = false; // Ferme le sous-menu s'il est ouvert
    this.router.navigate([path]); // Navigue vers le chemin spécifié
    // En option, ferme le menu off-canvas de manière programmatique
    const offcanvasNavbar = document.getElementById('offcanvasNavbar');
    if (offcanvasNavbar) {
      offcanvasNavbar.classList.remove('show');
    }
  }
}
