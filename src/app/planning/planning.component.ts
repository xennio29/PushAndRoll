import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-model/data/data.service';
import { Match } from '../data-model/model/match';

@Component({
  selector: 'pr-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  rounds: Match[][] = [];

  constructor(private dataService: DataService) {
    this.dataService.getRound1().subscribe( result => {
      this.rounds.push(result);
    });
    this.dataService.getRound2().subscribe( result => {
      this.rounds.push(result);
    });
    this.dataService.getRound3().subscribe( result => {
      this.rounds.push(result);
    });
  }

  ngOnInit(): void {
  }

}
