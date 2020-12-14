import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data-model/data/data.service';
import { Match } from '../data-model/model/match';

@Component({
  selector: 'pr-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  displayedColumns = ['rank', 'pseudo', 'score'];
  dataSource = new MatTableDataSource<RankPlayer>([]);



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.generateDataSource();
  }

  generateDataSource(): void {

    const rankPlayers: RankPlayer[] = [];

    this.dataService.players.forEach( player => {
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

    this.computeScoreForMatch(rankPlayers, this.dataService.matchsRonde1);
    this.computeScoreForMatch(rankPlayers, this.dataService.matchsRonde2);
    this.computeScoreForMatch(rankPlayers, this.dataService.matchsRonde3);

    this.computeScoreBonus(rankPlayers);

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

  computeScoreBonus(rankPlayers: RankPlayer[]) {

    // TODO : add bonus point for sucess challenge
  }

}

class RankPlayer {

  public readonly pseudo: string;
  public score: number;

  constructor(pseudo) {
    this.pseudo = pseudo;
    this.score = 0;
  }

  addScore(score: number): void {
    this.score = this.score + score;
  }
}
