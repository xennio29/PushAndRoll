import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MATCHSRONDE1 } from '../data-model/data/matchData';
import { AllPseudos, PLAYERS } from '../data-model/data/playerData';

@Component({
  selector: 'pr-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  displayedColumns = ['rank', 'pseudo', 'score'];
  dataSource = new MatTableDataSource<RankPlayer>([]);



  constructor() { }

  ngOnInit(): void {
    this.generateDataSource();
  }

  generateDataSource(): void {

    const rankPlayers: RankPlayer[] = [];

    PLAYERS.forEach( player => {
      rankPlayers.push(new RankPlayer(player.pseudo));
    });

    this.computeScore(rankPlayers);

    rankPlayers.sort(this.rankSort);

    this.dataSource =  new MatTableDataSource<RankPlayer>(rankPlayers);

  }

  rankSort(a: RankPlayer, b: RankPlayer): number {
    return b.score - a.score;
  }

  computeScore(rankPlayers: RankPlayer[]): void {

    console.log(rankPlayers);

    // Compute score for ronde 1
    MATCHSRONDE1.forEach (match => {

      if (match.place1) {
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place1).addScore(10);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place2).addScore(8);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place3).addScore(7);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place4).addScore(6);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place5).addScore(4);
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place6).addScore(3);
      }

      if (match.place7) {
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place7).addScore(2);
      }

      if (match.place8) {
        rankPlayers.find( rankPlayer => rankPlayer.pseudo === match.place8).addScore(1);
      }

    });

  }

}

class RankPlayer {

  public readonly pseudo: AllPseudos;
  public score: number;


  constructor(pseudo) {

    this.pseudo = pseudo;
    this.score = 0;

  }

  addScore(score: number): void {
    this.score = this.score + score;
  }
}
