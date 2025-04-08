import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-gestion-cloud',
  templateUrl: './gestion-cloud.component.html',
  styleUrls: ['./gestion-cloud.component.scss']
})
export class GestionCloudComponent {
  
  services = [
    {
      title: 'Migration Cloud Industrielle',
      description: 'AWS Migration Hub / Azure Migrate • Lift-and-shift automatisé • Tests de charge Gatling'
    },
    {
      title: 'Multi-Cloud Orchestration',
      description: 'Kubernetes multi-cloud (EKS/AKS/GKE) • Service Mesh Istio • Stockage CSI'
    },
    {
      title: 'Infra as Code (IaC)',
      description: 'Terraform Enterprise • Ansible Tower • Modules AWS/Azure/GCP certifiés'
    },
    {
      title: 'DevSecOps Cloud Native',
      description: 'AWS IAM / Azure AD • Scan containers Trivy • Vault Enterprise pour les secrets'
    },
    {
      title: 'Réseau Cloud Hybride',
      description: 'AWS Direct Connect / Azure ExpressRoute • SD-WAN automatisé • Gestion firewall Terraform'
    },
    {
      title: 'FinOps & Cost Intelligence',
      description: 'AWS Cost Explorer / Azure Cost Management • Kubecost • Optimisation Spot Instances'
    },
    {
      title: 'Sauvegarde Intelligente',
      description: 'AWS Backup / Azure Site Recovery • Velero pour Kubernetes • RPO/RTO garantis'
    },
    {
      title: 'Observabilité Full-Stack',
      description: 'AWS CloudWatch / Azure Monitor • Prometheus Thanos • Grafana Labs'
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