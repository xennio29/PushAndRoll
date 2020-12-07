import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  whiteLogo = 'assets/img/white_logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
