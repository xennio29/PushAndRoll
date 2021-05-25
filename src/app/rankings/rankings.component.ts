import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { DataService } from '../data-model/data/data.service';
import { Match } from '../data-model/model/match';
import { Player } from '../data-model/model/player';
import { Round } from '../data-model/model/Round';

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
      rounds: this.dataService.getAllMatch()
    }).subscribe(result => this.generateDataSource(result.player, result.rounds));
  }

  ngOnInit(): void {
  }

  /**
   * Generate the score board with all the players with their result in different matchs in all round.
   * @param players
   * @param matchs
   */
  generateDataSource(players: Player[], rounds: Round[]): void {

    const rankPlayers: RankPlayer[] = [];
    players.forEach( player => {
      rankPlayers.push(new RankPlayer(player));
    });

    this.computeScoreForRounds(rankPlayers, rounds);

    rankPlayers.sort(this.rankSort);
    this.dataSource =  new MatTableDataSource<RankPlayer>(rankPlayers);
  }

  /**
   * Add score for each match to players.
   * @param rankPlayers 
   */
  computeScoreForRounds(rankPlayers: RankPlayer[], rounds: Round[]): void {

    rounds.forEach (round => this.computeScoreARound(rankPlayers, round.matchs));
  }
  
  /**
   * Sort function for players by ranking
   */
  rankSort(a: RankPlayer, b: RankPlayer): number {
    return b.score - a.score;
  }


  computeScoreARound(rankPlayers: RankPlayer[], matchsOfTheRound: Match[]) {

    matchsOfTheRound.forEach (match => {

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
