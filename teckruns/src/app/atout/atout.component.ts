import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'teckruns-atout',
  templateUrl: './atout.component.html',
  styleUrls: ['./atout.component.scss']
})
export class AtoutComponent implements OnInit{

  isCollapsedExpertise: boolean = true;
  isCollapsedAccompagnement: boolean = true;
  isCollapsedFormation: boolean = true;
  isCollapsedSuivi: boolean = true;

  toggleCollapse(section: string): void {
    if (section === 'Expertise') {
      this.isCollapsedExpertise = !this.isCollapsedExpertise;
    } 
    if (section === 'Accompagnement') {
      this.isCollapsedAccompagnement = !this.isCollapsedAccompagnement;
    } 
    if (section === 'Formation') {
      this.isCollapsedFormation = !this.isCollapsedFormation;
    } 
    if (section === 'Suivi') {
      this.isCollapsedSuivi = !this.isCollapsedSuivi;
    } 
  }

  ngOnInit(): void {}

}
