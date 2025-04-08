import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devops',
  templateUrl: './devops.component.html',
  styleUrls: ['./devops.component.scss']
})
export class DevopsComponent implements OnInit{
  
  services = [
    {
      title: 'Orchestration Kubernetes Avancée',
      description: 'Clusters HA • Service Mesh • Auto-scaling intelligent • Backup automatisé'
    },
    {
      title: 'Pipelines CI/CD Optimisées',
      description: 'GitLab CI/Jenkins • Tests parallèles • Déploiement Blue-Green • Rollback automatique'
    },
    {
      title: 'Infrastructure Programmée',
      description: 'Terraform/Ansible • Multi-cloud • Gestion réseau via API • DR automatisé'
    },
    {
      title: 'Containerisation Sécurisée',
      description: 'Docker • Buildpacks • Scan vulnérabilités • Images minimalistes'
    },
    {
      title: 'Observabilité Full-Stack',
      description: 'Prometheus/Grafana • Logging centralisé • Alerting prédictif • Traces distribuées'
    },
    {
      title: 'DevSecOps Intégré',
      description: 'SAST/DAST • Hardening CIS • RBAC dynamique • Audit automatique'
    }
  ];

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  navigateToContact() {
    if (window.innerWidth < 768) {
      window.location.href = '/contact'; // Bypass Angular Router
    } else {
      this.router.navigate(['/contact']);
    }
  }
}
