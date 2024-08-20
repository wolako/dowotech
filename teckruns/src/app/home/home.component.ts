import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
 
  carousel = [
    {
      urlImg : '../assets/images/15.png'
    },
    {
      urlImg : '../assets/images/13.png'
    },
    {
      urlImg : '../assets/images/11.png'
    },
  ]

  ngOnInit(): void {}

}
