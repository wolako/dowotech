// about.component.ts
import { Component, OnInit } from '@angular/core';
import { 
  trigger,
  transition,
  query,
  style,
  stagger,
  animate 
} from '@angular/animations';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.6s ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('heroFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('1s 0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardPop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.6s 1s cubic-bezier(.17,.67,.24,1.24)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('0.6s ease', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('techFlip', [
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateY(90deg)' }),
        animate('0.6s ease', 
          style({ opacity: 1, transform: 'rotateY(0)' }))
      ])
    ]),

    trigger('countUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s 0.5s cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' })),
        
        // Animation de comptage numérique
        query('.figure-number', [
          style({ opacity: 0, width: '0' }),
          animate('1s ease-out', 
            style({ opacity: 1, width: '*' }))
        ], { optional: true })
      ])
    ])
  ]
})

export class AboutComponent implements OnInit {
  animatedNumbers: any = {};
  // Section Notre Engagement
  values = [
    {
      title: 'Développement Sur-Mesure',
      description: 'Applications web/mobile sécurisées et scalables',
      icon: 'code'
    },
    {
      title: 'Infrastructure Hybride',
      description: 'Intégration cloud & solutions réseau physiques',
      icon: 'network_ping'
    },
    {
      title: 'DevOps Industriels',
      description: 'Automatisation CI/CD et monitoring temps réel',
      icon: 'settings_suggest'
    }
  ];

  // Valeurs fondamentales
  coreValues = [
    {
      icon: 'bolt',
      title: 'Agilité Startup',
      description: 'Délais rapides et approche flexible'
    },
    {
      icon: 'engineering',
      title: 'Expertise Full-Stack',
      description: 'Maîtrise de toute la chaîne technologique'
    },
    {
      icon: 'groups',
      title: 'Collaboration Transparente',
      description: 'Communication directe avec nos experts'
    }
  ];

  // Chiffres clés
  keyFigures = [
    {
      number: '100%', 
      label: 'Projets livrés dans les délais',
      icon: 'timer'
    },
    {
      number: '24/7', 
      label: 'Support réactif',
      icon: 'support_agent'
    },
    {
      number: '30+',
      label: 'Technologies maîtrisées', 
      icon: 'memory'
    }
  ];

  // Technologies maîtrisées
  technologies = [
    { 
      name: 'AWS', 
      logo: 'assets/images/aws.png',
      certification: 'Solution Architect Associate'
    },
    { 
      name: 'Kubernetes', 
      logo: 'assets/images/k8s.png',
      certification: 'CKAD/CKA Certified'
    },
    { 
      name: 'Terraform', 
      logo: 'assets/images/terraform.png',
      certification: 'Infrastructure as Code'
    },
    { 
      name: 'Docker', 
      logo: 'assets/images/docker.png',
      certification: 'Certified Container Specialist'
    },
    { 
      name: 'Azure', 
      logo: 'assets/images/azure.png',
      certification: 'Azure Administrator Associate'
    },
    { 
      name: 'Jenkins', 
      logo: 'assets/images/jenkins.png',
      certification: 'Pipeline as Code'
    },
    { 
      name: 'Ansible', 
      logo: 'assets/images/ansible.png',
      certification: 'Automation Expert'
    },
    { 
      name: 'GitLab', 
      logo: 'assets/images/gitlab-48.png',
      certification: 'DevOps Platform'
    },
    { 
      name: 'Réseau', 
      logo: 'assets/images/cisco.png',
      certification: 'Cisco/Fortinet' 
    },
  ];

  constructor(private vpScroller: ViewportScroller){}
 
  ngOnInit(): void {
    this.vpScroller.scrollToPosition([0, 0]);
  }

  onCountDone(figure: any) {
    if (!this.animatedNumbers[figure.number]) {
      const targetValue = parseInt(figure.number);
      this.animatedNumbers[figure.number] = 0;
      const interval = setInterval(() => {
        if (this.animatedNumbers[figure.number] >= targetValue) {
          clearInterval(interval);
        } else {
          this.animatedNumbers[figure.number]++;
        }
      }, 50);
    }
  }
  
  animatedNumber(figure: any) {
    const numericValue = parseInt(figure.number); // Extrait 200 de '200+'
    const animatedValue = this.animatedNumbers[figure.number] || 0;
    
    // Vérifie si le chiffre original contient '+'
    return figure.number.includes('+') 
      ? `${animatedValue}+` // Ajoute le '+' si nécessaire
      : animatedValue.toString();
    }

}