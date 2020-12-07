import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pr-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  whiteLogo = 'assets/img/white_logo.png';

  constructor() { }

  @Output() public sidenavClose = new EventEmitter();


  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }


}
