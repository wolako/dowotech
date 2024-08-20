import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private services = [
    {
      id: 1,
      icon: "https://icons8.com/icon/e4u8KCUe28CX/web-developer",
      title: "Développement web",
      description: "Nous créons des sites web, des applications modernes et performants."
    },
    {
      id: 2,
      icon: "https://icons8.com/icon/e4u8KCUe28CX/web-developer",
      title: "Infrastructure IT",
      description: "Libérez le potentiel de votre entreprise avec notre Service d'Infrastructure IT Innovant !"
    },
    {
      id: 3,
      icon: "https://icons8.com/icon/DFima4JnoTu5/multicast",
      title: "DevOps",
      description: "Transformez Votre Développement avec Nos Services DevOps Avancés !"
    }
  ];

  getServices(){
    return this.services;
  }

  getServicesById(id: number){
    return this.services.find((services) => services.id === id);
  }
  constructor() { }
}
