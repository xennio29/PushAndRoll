import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-model/data/data.service';
import { Round } from '../data-model/model/Round';

@Component({
  selector: 'pr-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  rounds: Round[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getAllMatch().subscribe(result => this.rounds = result);
  }

  ngOnInit(): void {
  }

}
