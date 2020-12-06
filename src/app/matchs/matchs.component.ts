import { Component, OnInit } from '@angular/core';
import { MATCHSRONDE1, MATCHSRONDE2, MATCHSRONDE3 } from '../data-model/data/matchData';

@Component({
  selector: 'pr-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent implements OnInit {

  matchsRonde1 = MATCHSRONDE1;
  matchsRonde2 = MATCHSRONDE2;
  matchsRonde3 = MATCHSRONDE3;

  constructor() { }

  ngOnInit(): void {
  }

}
