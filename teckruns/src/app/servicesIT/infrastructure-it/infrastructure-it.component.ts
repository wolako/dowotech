import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infrastructure-it',
  templateUrl: './infrastructure-it.component.html',
  styleUrls: ['./infrastructure-it.component.scss']
})
export class InfrastructureITComponent implements OnInit{
  
  constructor(private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
