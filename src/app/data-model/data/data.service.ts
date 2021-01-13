import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/match';
import { Agence, Challenges, Player } from '../model/player';
import { OriginOrClass, Pod } from '../model/pod';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _players: Player[];
  private _pods: Pod[];
  private _matchsRonde1: Match[];
  private _matchsRonde2: Match[];
  private _matchsRonde3: Match[];

  public playerEmitter: EventEmitter<Player[]>;
  public podEmitter: EventEmitter<Pod[]>;
  public ronde1Emitter: EventEmitter<Match[]>;
  public ronde2Emitter: EventEmitter<Match[]>;
  public ronde3Emitter: EventEmitter<Match[]>;

  loaded = false;

  constructor(private http: HttpClient) { 

    this.playerEmitter = new EventEmitter();
    this.podEmitter = new EventEmitter();
    this.ronde1Emitter = new EventEmitter();
    this.ronde2Emitter = new EventEmitter();
    this.ronde3Emitter = new EventEmitter();

  }


  loadData(): Observable<any> {

    return new Observable<any> ((observer) => {

      this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/tournamentData.json').subscribe(data => {
  
        console.log('Welcome to ' + data.tournamentName);
  
        this._players = this.constructPlayers(data.players);
        console.log(this._players.length + ' players imported.');
  
        this._pods = this.constructPods(data.pods);
        console.log(this._pods.length + ' pods imported.');
  
        this._matchsRonde1 = this.constructMatchs(data.matchsRonde1);
        console.log(this._matchsRonde1.length + ' matchs imported for ronde 1');
  
        this._matchsRonde2 = this.constructMatchs(data.matchsRonde2);
        console.log(this._matchsRonde2.length + ' matchs imported for ronde 2');
  
        this._matchsRonde3 = this.constructMatchs(data.matchsRonde3);
        console.log(this._matchsRonde3.length + ' matchs imported for ronde 3');

        observer.complete();
      });

    });

  }

  // ASKER
  //////////////////////

  askData(...datasType: DataType[]) {

    if(!this.loaded) {
      this.loadData().subscribe({
        complete: () => {
          this.loaded = true;
          this.emitData(...datasType);
        }
      });
    } else {
      this.emitData(...datasType);
    }

  }

  private emitData(...datasType: DataType[]) {

    datasType.forEach( dataType => {
      switch (dataType) {
        case DataType.Players: this.playerEmitter.emit(this._players);
        case DataType.Pods: this.podEmitter.emit(this._pods);
        case DataType.Ronde1: this.ronde1Emitter.emit(this._matchsRonde1);
        case DataType.Ronde2: this.ronde2Emitter.emit(this._matchsRonde2);
        case DataType.Ronde3: this.ronde3Emitter.emit(this._matchsRonde3);
      }
    })
  }

  // PLAYER CONSTRUCTION
  //////////////////////

  private constructPlayers(players): Player[] {
    const tournamentPlayers: Player[] = [];

    players.forEach(player => {
      tournamentPlayers.push(this.toPlayerDomain(player));      
    });

    return tournamentPlayers;
  }

  private toPlayerDomain(player): Player {
    return new Player(
      player.id,
      player.firstName,
      player.lastName,
      player.pseudo,
      this.getAgence(player.agence),
      new Challenges(
        player.challenges?.missCalculation,
        player.challenges?.FoN,
        player.challenges?.quatreALaSuite,
        player.challenges?.oneV9,
        player.challenges?.familyFirst,
        player.challenges?.turboHighrolleur)
    );
  }

  private getAgence(agenceNumber: number): Agence {

    switch(agenceNumber) {
      case 1026:
        return Agence.Aeroline1026;
      case 588:
        return Agence.Agence588;
      case 1024:
        return Agence.agence1024;
      case 1030: 
        return Agence.agence1030;
      case 1205:
        return Agence.agence1205;
      case 4040:
        return Agence.agence4040;
      default:
        return Agence.agenceOther;
    }
  }

  // POD CONSTRUCTION
  //////////////////////

  private constructPods(pods): Pod[] {
    const tournamentPods: Pod[] = [];

    pods.forEach(pod => {
      tournamentPods.push(this.toPodDomain(pod));      
    });

    this.checkDoublons(tournamentPods);

    this.checkNoPodPlayer(tournamentPods);

    return tournamentPods;
  }

  private toPodDomain(pod): Pod {
    return new Pod(
      this.getPodOriginOrClass(pod.OriginOrClass),
      this.getPlayerPseudoFromId(pod.player1),
      this.getPlayerPseudoFromId(pod.player2),
      this.getPlayerPseudoFromId(pod.player3),
      this.getPlayerPseudoFromId(pod.player4),
    );
  }

  private getPlayerPseudoFromId(playerId: number): string {
    const player = this._players.find( player => player.id === playerId);

    if(player) {
      return player.pseudo;
    } else {
      console.error('[DATA ERROR FOR POD]: wrong playerID : ', playerId);
      return undefined;
    }
  }

  private checkDoublons(tournamentPods: Pod[]) {

    const allPlayer: string[] = [];

    tournamentPods.forEach(pod => {
      pod.playersPseudo.forEach(playerPseudo => {
        if(allPlayer.indexOf(playerPseudo) === -1) {
          allPlayer.push(playerPseudo);
        } else {
          console.error('[DATA ERROR FOR POD]: player', playerPseudo, 'in more than one pod');
        }
      });
    });

  }

  private checkNoPodPlayer (tournamentPods: Pod[]) {
    const players = [...this._players];

    tournamentPods.forEach(pod => {

      pod.playersPseudo.forEach(playerPseudo => {
        players.splice(players.findIndex(player => player.pseudo === playerPseudo), 1)
      });
      
    });

    console.error('[DATA ERROR FOR PLAYER]: No pod for this player', players);

  }
  
  // MATCH CONSTRUCTION
  //////////////////////

  private constructMatchs(matchs): Match[] {
    const tournamentMatchs: Match[] = [];

    matchs.forEach(match => {
      tournamentMatchs.push(this.toMatchDomain(match));      
    });

    return tournamentMatchs;
  }

  private toMatchDomain(match): Match {
    return new Match(
      this.getPodFromOriginOrClass(match.pod1),
      this.getPodFromOriginOrClass(match.pod2),
      match.date,
      match.place1,
      match.place2,
      match.place3,
      match.place4,
      match.place5,
      match.place6,
      match.place7,
      match.place8
    );
  }

  private getPodFromOriginOrClass(originOrClassName): Pod {
    const originOrClass = this.getPodOriginOrClass(originOrClassName)
    return this._pods.find(pod => pod.name === originOrClass);
  }

  // UTILS
  //////////////////////

  private getPodOriginOrClass(originOrClass: string): OriginOrClass {

    switch(originOrClass) {
      case "Cultist":
        return OriginOrClass.Cultist;
      case "Divine":
        return OriginOrClass.Divine;
      case "Dusk":
        return OriginOrClass.Dusk;
      case "Enligntened":
        return OriginOrClass.Enlightened;
      case "Elderwood":
        return OriginOrClass.Elderwood;
      case "Fortune":
        return OriginOrClass.Fortune;
      case "Moonlight":
        return OriginOrClass.Moonlight;
      case "Ninja":
        return OriginOrClass.Ninja;
      case "Spirit":
        return OriginOrClass.Spirit;
      case "Warlord":
        return OriginOrClass.Warlord;
      case "Assasin":
        return OriginOrClass.Assasin;
      case "Brawler":
        return OriginOrClass.Brawler;
      case "Dazzler":
        return OriginOrClass.Dazzler;
      case "Duelist":
        return OriginOrClass.Duelist;
      case "Hunter":
        return OriginOrClass.Hunter;
      case "Keeper":
        return OriginOrClass.Keeper;
      case "Mage":
        return OriginOrClass.Mage;
      case "Mystic":
        return OriginOrClass.Mystic;
      case "Sharpshooter":
        return OriginOrClass.Sharpshooter;
      case "Vanguard":
        return OriginOrClass.Vanguard;
      default:
        console.error('[DATA ERROR FOR POD]: on Origin or Class  : ', originOrClass);
        return null;
    }
  }

}

export enum DataType {
  Players,
  Pods,
  Ronde1,
  Ronde2,
  Ronde3
}
