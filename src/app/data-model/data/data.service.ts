import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Match } from '../model/match';
import { Player } from '../model/player';
import { Pod } from '../model/pod';
import { DataBase } from './database';
import { DataBaseProvider } from './DataBaseProvider';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * All emitter need for each data
   */
  public tournamentNameEmitter: EventEmitter<string>;
  public tournamentRulesEmitter: EventEmitter<any>;
  public playerEmitter: EventEmitter<Player[]>;
  public podEmitter: EventEmitter<Pod[]>;
  public ronde1Emitter: EventEmitter<Match[]>;
  public ronde2Emitter: EventEmitter<Match[]>;
  public ronde3Emitter: EventEmitter<Match[]>;

  constructor(private dataBaseProvider: DataBaseProvider) { 
    this.tournamentNameEmitter = new EventEmitter();
    this.playerEmitter = new EventEmitter();
    this.podEmitter = new EventEmitter();
    this.ronde1Emitter = new EventEmitter();
    this.ronde2Emitter = new EventEmitter();
    this.ronde3Emitter = new EventEmitter();
  }

  // ASKER
  //////////////////////

  askData(...datasType: DataType[]) {

    this.dataBaseProvider.loadDatabase().subscribe((dataBase: DataBase) => {
      this.emitData(dataBase, ...datasType);
    });
  }

  private emitData(dataBase: DataBase, ...datasType: DataType[]) {

    datasType.forEach( dataType => {
      switch (dataType) {
        case DataType.TournamentName: this.tournamentNameEmitter.emit(dataBase.getTournamentName());
        case DataType.Rules: this.tournamentRulesEmitter.emit(dataBase.getRules());
        case DataType.Players: this.playerEmitter.emit(dataBase.getPlayers());
        case DataType.Pods: this.podEmitter.emit(dataBase.getPods());
        case DataType.Ronde1: this.ronde1Emitter.emit(dataBase.getRonde1());
        case DataType.Ronde2: this.ronde2Emitter.emit(dataBase.getRonde2());
        case DataType.Ronde3: this.ronde3Emitter.emit(dataBase.getRonde3());
      }
    })
  }
}

export enum DataType {
  TournamentName,
  Rules,
  Players,
  Pods,
  Ronde1,
  Ronde2,
  Ronde3
}
