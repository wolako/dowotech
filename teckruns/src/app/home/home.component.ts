import { ViewportScroller } from '@angular/common';
import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  OnInit, 
  QueryList, 
  ViewChildren 
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isFullscreen = false;

  @ViewChildren('scrollSection') scrollSections!: QueryList<ElementRef>;
  
  constructor(
    private vpScroller: ViewportScroller,
    private router: Router
  ){}
 
  ngOnInit(): void {
    this.vpScroller.scrollToPosition([0, 0]);
  }
  
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.setAttribute('data-visible', entry.isIntersecting.toString());
      });
    }, {
      rootMargin: '-20% 0px',
      threshold: 0.05
    });
  
    document.querySelectorAll('[data-scroll-section]').forEach(section => {
      observer.observe(section);
    });
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}

