import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'teckruns-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor( private router: Router){}

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
