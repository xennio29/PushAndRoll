import { Component, OnInit } from '@angular/core';
import { DataService, DataType } from '../data-model/data/data.service';

@Component({
  selector: 'pr-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(private dataService: DataService) {
    this.dataService.tournamentRulesEmitter.subscribe(result => {
      console.log(result);
    });
    this.dataService.askData(DataType.Rules);
  }

  ngOnInit(): void {
  }

}
