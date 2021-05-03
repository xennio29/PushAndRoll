import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-model/data/data.service';
import { Round } from '../data-model/model/Round';

@Component({
  selector: 'pr-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent implements OnInit {

  rounds: Round[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getAllMatch().subscribe(result => this.rounds = result);
  }

  ngOnInit(): void {
  }

}
