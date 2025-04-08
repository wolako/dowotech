import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infrastructure-it',
  templateUrl: './infrastructure-it.component.html',
  styleUrls: ['./infrastructure-it.component.scss']
})
export class InfrastructureITComponent implements OnInit {
  
  services = [
    {
      title: 'Architecture Spine-Leaf',
      description: 'Cisco Nexus 9000 • Latence <1ms • Redondance complète'
    },
    {
      title: 'Gestion de la QoS',
      description: 'Priorisation VoIP (SIP/RTP) • MPLS • Classes de service'
    },
    {
      title: 'Réseau Hybride',
      description: 'SD-WAN (VeloCloud) • VPN IPSec • Optimisation WAN'
    },
    {
      title: 'Sécurité Périmétrique',
      description: 'Next-Gen Firewall (FortiGate) • DPI • Segmentation micro-réseaux'
    },
    {
      title: 'Certification Network+',
      description: 'Audit conformité • Documentation technique • Formation équipes'
    }
  ];

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  scrollToContact(): void {
    this.viewportScroller.scrollToAnchor('contactSection');
  }

  navigateToContact() {
    if (window.innerWidth < 768) {
      window.location.href = '/contact'; // Bypass Angular Router
    } else {
      this.router.navigate(['/contact']);
    }
  }
}