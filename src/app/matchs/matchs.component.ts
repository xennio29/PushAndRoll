import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-model/data/data.service';
import { Match } from '../data-model/model/match';

@Component({
  selector: 'pr-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent implements OnInit {

  matchsRonde1: Match[];
  matchsRonde2: Match[];
  matchsRonde3: Match[];

  constructor(private dataService: DataService) {
    this.dataService.getRound1().subscribe( result => {
      this.matchsRonde1 = result;
    });
    this.dataService.getRound2().subscribe( result => {
      this.matchsRonde2 = result;
    });
    this.dataService.getRound3().subscribe( result => {
      this.matchsRonde3 = result;
    });
  }

  ngOnInit(): void {
  }

}
