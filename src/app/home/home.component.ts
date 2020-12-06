import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  belugasLogo = '../../assets/img/redblack_logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
