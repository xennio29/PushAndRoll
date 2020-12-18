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
    this.matchsRonde1 = this.dataService.matchsRonde1;
    this.matchsRonde2 = this.dataService.matchsRonde2;
    this.matchsRonde3 = this.dataService.matchsRonde3;
  }

  ngOnInit(): void {
  }

}
