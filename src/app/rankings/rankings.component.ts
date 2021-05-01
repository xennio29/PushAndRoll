import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { DataService } from '../data-model/data/data.service';
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

  constructor(private dataService: DataService) {

    forkJoin({
      player: this.dataService.getPlayers(),
      round1: this.dataService.getRound1(),
      round2: this.dataService.getRound2(),
      round3: this.dataService.getRound3()
    }).subscribe( result => {
      this.generateDataSource(result.player, [result.round1, result.round2, result.round3]);
    });
  }

  ngOnInit(): void {
  }

  /**
   * Generate the score board with all the players with their result in different matchs.
   * @param players
   * @param matchs
   */
  generateDataSource(players: Player[], matchs: Match[][]): void {

    const rankPlayers: RankPlayer[] = [];
    players.forEach( player => {
      rankPlayers.push(new RankPlayer(player));
    });

    this.computeScore(rankPlayers, matchs);

    rankPlayers.sort(this.rankSort);
    this.dataSource =  new MatTableDataSource<RankPlayer>(rankPlayers);
  }

  /**
   * Add score for each match to players.
   * @param rankPlayers 
   */
  computeScore(rankPlayers: RankPlayer[], matchs: Match[][]): void {

    matchs.forEach( (round: Match[]) => {
      this.computeScoreForMatch(rankPlayers, round);
    });
  }
  
  /**
   * Sort function for players by ranking
   */
  rankSort(a: RankPlayer, b: RankPlayer): number {
    return b.score - a.score;
  }


  computeScoreForMatch(rankPlayers: RankPlayer[], round: Match[]) {

    round.forEach (match => {

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
