import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'pr-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  whiteLogo = '../../assets/img/white_logo.png';
  rootName = '';

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.rootName = this.getMenuName(event.urlAfterRedirects);
      }
    });
  }

  getMenuName(path: string): string {
    switch (path) {
      case '/home':
        return 'Home';
      case '/participants':
        return 'Participants';
      case '/rules':
        return 'Réglement';
      case '/pods':
        return 'Pods';
      case '/matchs':
        return 'Matchs';
      case '/rankings':
        return 'Classement';
    }

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
