import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developpement',
  templateUrl: './developpement.component.html',
  styleUrls: ['./developpement.component.scss']
})
export class DeveloppementComponent implements OnInit{

  services = [
    {
      title: 'Frontend Moderne',
      items: [
        'Applications Angular/React professionnelles',
        'SPA/PWA avec gestion d\'état avancée',
        'Intégration de design systems'
      ]
    },
    {
      title: 'Backend Solide',
      items: [
        'API REST/GraphQL (Spring/Django/Node.js)',
        'Microservices containerisés',
        'Bases de données MySQL/PostgreSQL/SQL'
      ]
    },
    {
      title: 'Mobile Hybride',
      items: [
        'Applications cross-platform (React Native)',
        'Intégration de modules natifs',
        'Publication sur les stores'
      ]
    },
    {
      title: 'DevOps',
      items: [
        'CI/CD automatisé (Jenkins/GitLab CI)',
        'Infrastructure as Code (Terraform)',
        'Monitoring & logging centralisé'
      ]
    }
  ];

  // Pour la carte image (à utiliser dans le HTML si nécessaire)
  imageCard = {
    imageUrl: '../assets/images/dev.png',
    altText: 'Développement'
  };

  constructor(
    private vpScroller: ViewportScroller,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vpScroller.scrollToPosition([0, 0]);
  }

  navigateToContact() {
    if (window.innerWidth < 768) {
      window.location.href = '/contact'; // Bypass Angular Router
    } else {
      this.router.navigate(['/contact']);
    }
  }
}

