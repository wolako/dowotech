// nos-services.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'techrun-nos-services',
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.scss']
})
export class NosServicesComponent {

  services: Service[] = [
    {
      title: 'Développement d\'Apps',
      description: 'Applications web/mobile full-stack (Angular/React/Java) avec architecture microservices et déploiement CI/CD',
      image: '../assets/images/developing.png',
      link: '/developpement'
    },
    {
      title: 'Infrastructure Réseau',
      description: 'Solutions réseau haute performance : SD-WAN automatisé (Cisco/Fortinet), monitoring temps réel (PRTG) et sécurité Zero Trust (Palo Alto) avec SLA 99.99%',
      image: '../assets/images/cyber-securite.png',
      link: '/infrastructure-it'
    },
    {
      title: ' Automatisation DevOps',
      description: 'Industrialisation DevOps : pipelines CI/CD haute fréquence (GitLab/Jenkins), infrastructure immuable (Terraform/Ansible), et monitoring temps réel (Prometheus/Grafana) pour un SLA de 99.99%',
      image: '../assets/images/agile.png',
      link: '/devops'
    },
    {
      title: 'Gestion Cloud',
      description: 'Optimisation multi-cloud (AWS/Azure/GCP) avec Kubernetes managé, FinOps (Kubecost) et sécurité intégrée (Vault/Trivy)',
      image: '../assets/images/cloud-management.png',
      link: '/gestion-cloud'
    }
  ];

  constructor(private router: Router) {}

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}