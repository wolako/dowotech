import { Component } from '@angular/core';
import { 
  trigger,
  state,
  style,
  animate,
  transition 
} from '@angular/animations';


@Component({
  selector: 'teckruns-atout',
  templateUrl: './atout.component.html',
  styleUrls: ['./atout.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ 
        height: '0',
        opacity: 0,
        padding: '0 24px' 
      })),
      state('expanded', style({ 
        height: '*',
        opacity: 1,
        padding: '{{padding}}'
      }), { params: { padding: '16px 24px' }}),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class AtoutComponent {
  
  panelStates: boolean[] = [];

  atouts = [
    {
      icon: 'code',
      title: 'Développement Full-Stack',
      description: 'Création d\'applications web/mobile performantes avec les dernières technologies (Angular, Flutter, Node.js)'
    },
    {
      icon: 'cloud',
      title: 'Infrastructure Cloud',
      description: 'Déploiement et optimisation d\'architectures AWS/Azure avec stratégie FinOps'
    },
    {
      icon: 'dns',
      title: 'Réseaux d\'Entreprise',
      description: 'Installation et gestion d\'infrastructures réseau sécurisées (Cisco, VLAN, SD-WAN)'
    },
    {
      icon: 'settings',
      title: 'Automatisation DevOps',
      description: 'Mise en place de pipelines CI/CD et infrastructure as code (Terraform, Ansible)'
    }
  ];

  trackByFn(index: number, item: any): number {
    return index;
  }

}
