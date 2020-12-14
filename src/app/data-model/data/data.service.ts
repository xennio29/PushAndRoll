import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as testData from '../../../assets/testData.json';
import { Match } from '../model/match';
import { Agence, Player } from '../model/player';
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

  constructor(private http: HttpClient) { 

    /** real call/
    this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/data.json').subscribe(data => {
      console.log('hello there');
      console.log(data);
    });
    **/

    console.log('Welcome to ' + testData.tournamentName);

    this._players = this.constructPlayers(testData.players);
    console.log(this._players.length + ' players imported.');

    this._pods = this.constructPods(testData.pods);
    console.log(this._pods.length + ' pods imported.');

    this._matchsRonde1 = this.constructMatchs(testData.matchsRonde1);
    console.log(this._matchsRonde1.length + ' matchs imported for ronde 1');

    this._matchsRonde2 = this.constructMatchs(testData.matchsRonde2);
    console.log(this._matchsRonde2.length + ' matchs imported for ronde 2');

    this._matchsRonde3 = this.constructMatchs(testData.matchsRonde3);
    console.log(this._matchsRonde3.length + ' matchs imported for ronde 3');

  }

  // GETTERS
  //////////////////////

  get players() {
    return this._players;
  }

  get pods() {
    return this._pods;
  }

  get matchsRonde1() {
    return this._matchsRonde1;
  }

  get matchsRonde2() {
    return this._matchsRonde2;
  }

  get matchsRonde3() {
    return this._matchsRonde3;
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
      this.getAgence(player.agence)
    );
  }

  private getAgence(agenceNumber: number): Agence {

    switch(agenceNumber) {
      case 1026:
        return Agence.Aeroline1026;
      default:
        return null;
    }
  }

  // POD CONSTRUCTION
  //////////////////////

  private constructPods(pods): Pod[] {
    const tournamentPods: Pod[] = [];

    pods.forEach(pod => {
      tournamentPods.push(this.toPodDomain(pod));      
    });

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
