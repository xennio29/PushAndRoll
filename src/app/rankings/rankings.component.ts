import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { DataService, DataType } from '../data-model/data/data.service';
import { Match } from '../data-model/model/match';
import { Player } from '../data-model/model/player';

@Component({
  selector: 'pr-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  displayedColumns = ['rank', 'pseudo', 'score'];
  dataSource = new MatTableDataSource<RankPlayer>([]);

  players: Player[];
  matchsRonde1: Match[];
  matchsRonde2: Match[];
  matchsRonde3: Match[];

  constructor(private dataService: DataService) {

    this.dataService.playerEmitter.subscribe( result => {
      this.players = result;
    });

    this.dataService.ronde1Emitter.subscribe( result => {
      this.matchsRonde1 = result;
    });
    this.dataService.ronde2Emitter.subscribe( result => {
      this.matchsRonde2 = result;
    });
    this.dataService.ronde3Emitter.subscribe( result => {
      this.matchsRonde3 = result;
      this.generateDataSource();
    });

    this.dataService.askData(DataType.Players, DataType.Ronde1, DataType.Ronde2, DataType.Ronde3);


  }

  ngOnInit(): void {
  }

  generateDataSource(): void {

    const rankPlayers: RankPlayer[] = [];

    this.players.forEach( player => {
      rankPlayers.push(new RankPlayer(player));
    });

    this.computeScore(rankPlayers);

    rankPlayers.sort(this.rankSort);

    this.dataSource =  new MatTableDataSource<RankPlayer>(rankPlayers);

  }

  rankSort(a: RankPlayer, b: RankPlayer): number {
    return b.score - a.score;
  }

  computeScore(rankPlayers: RankPlayer[]): void {

    this.computeScoreForMatch(rankPlayers, this.matchsRonde1);
    this.computeScoreForMatch(rankPlayers, this.matchsRonde2);
    this.computeScoreForMatch(rankPlayers, this.matchsRonde3);

  }

  computeScoreForMatch(rankPlayers: RankPlayer[], ronde: Match[]) {

    ronde.forEach (match => {

      if (match.place1) {
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place1).addScore(10);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place2).addScore(8);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place3).addScore(7);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place4).addScore(6);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place5).addScore(4);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place6).addScore(3);
        
        if (match.place7) {
          rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place7).addScore(2);
        }
  
        if (match.place8) {
          rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place8).addScore(1);
        }

      }
    });
    
  }

}

class RankPlayer {

  public readonly pseudo: string;
  public score: number;

  constructor(player: Player) {
    this.pseudo = player.pseudo;
    this.score = 0;
    if (player.challenges) {

      // TODO add new challenge
    }
    
  }

  addScore(score: number): void {
    this.score = this.score + score;
  }
}
