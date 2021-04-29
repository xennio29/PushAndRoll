import { Component, OnInit } from '@angular/core';
import { DataService, DataType } from '../data-model/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  belugasLogo = 'assets/img/redblack_logo.png';

  tournamentName: string;

  constructor(private dataService: DataService) {

    this.dataService.tournamentNameEmitter.subscribe(result => {
      this.tournamentName = result;
    })
    this.dataService.askData(DataType.TournamentName);
   }

  ngOnInit(): void {
  }

}
