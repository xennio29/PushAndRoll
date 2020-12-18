import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Match } from 'src/app/data-model/model/match';

@Component({
  selector: 'pr-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  displayedColumns = ['pseudo', 'placement'];

  dataSource = new MatTableDataSource<PlayerScore>();

  @Input() match: Match;

  matchName: string;

  constructor() { }

  ngOnInit(): void {

    const originAndClassName1 = this.match.pod1.getOriginOrClassName();
    const originAndClassName2 = this.match.pod2.getOriginOrClassName();

    this.matchName = originAndClassName1.francais + ' and ' + originAndClassName2.francais
                + ' // ' + originAndClassName1.english + ' et ' + originAndClassName2.english;

    this.generateDataSource();
  }

  generateDataSource(): void {

    const playerScores: PlayerScore[] = [];

    if (this.match.place1) {
      playerScores.push(new PlayerScore(this.match.place6, 6));
      playerScores.push(new PlayerScore(this.match.place5, 5));
      playerScores.push(new PlayerScore(this.match.place4, 4));
      playerScores.push(new PlayerScore(this.match.place3, 3));
      playerScores.push(new PlayerScore(this.match.place2, 2));
      playerScores.push(new PlayerScore(this.match.place1, 1));

      if(this.match.place7) {
        playerScores.push(new PlayerScore(this.match.place7, 7));
      }
      if(this.match.place8) {
        playerScores.push(new PlayerScore(this.match.place8, 8));
      }
      

      playerScores.sort( (a, b) => a.playerRank - b.playerRank);

    } else {
      const playersPseudos = this.match.pod1.playersPseudo.concat(this.match.pod2.playersPseudo);
      playersPseudos.forEach( name => playerScores.push(new PlayerScore(name, undefined)));

    }

    this.dataSource = new MatTableDataSource<PlayerScore>(playerScores);


  }

}

class PlayerScore {
  public playerName: string;
  public playerRank: number;

  constructor(playerName: string, playerRank: number) {
    this.playerName = playerName;
    this.playerRank = playerRank;
  }
}
