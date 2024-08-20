import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developpement',
  templateUrl: './developpement.component.html',
  styleUrls: ['./developpement.component.scss']
})
export class DeveloppementComponent implements OnInit{

  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}

