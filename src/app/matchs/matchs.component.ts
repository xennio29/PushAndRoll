import { Component, OnInit } from '@angular/core';
import { DataService, DataType } from '../data-model/data/data.service';
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
    this.dataService.ronde1Emitter.subscribe( result => {
      this.matchsRonde1 = result;
    });
    this.dataService.ronde2Emitter.subscribe( result => {
      this.matchsRonde2 = result;
    });
    this.dataService.ronde3Emitter.subscribe( result => {
      this.matchsRonde3 = result;
    });

    this.dataService.askData(DataType.Ronde1, DataType.Ronde2, DataType.Ronde3);
  }

  ngOnInit(): void {
  }

}
