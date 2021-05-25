import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data-model/data/data.service';
import { Challenge } from '../data-model/model/challenge';
import { Player } from '../data-model/model/player';

@Component({
  selector: 'pr-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'pseudo', 'challenges'];

  participants: Player[] = [];
  challenges: Challenge[] = [];
  dataSource;

  constructor(private dataService: DataService) {

    this.dataService.getPlayers().subscribe(result => {
      this.participants = result;
      this.dataSource = new MatTableDataSource(this.participants);
      this.dataSource.sort = this.sort;
    });

    this.dataService.getChallenges().subscribe(result => this.challenges = result);
  }

  isChallengeUnachieved(challenge: Challenge, player: Player) {
    return player.challenges.find(playerChallenge => playerChallenge === challenge) === undefined;
  }
}