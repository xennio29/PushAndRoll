import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/match';
import { Player } from '../model/player';
import { Pod } from '../model/pod';
import { DataBase } from './database';
import { DataBaseProvider } from './DataBaseProvider';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* The database once it's import. */
  private database: DataBase = null;

  constructor(private dataBaseProvider: DataBaseProvider) { 

    dataBaseProvider.databaseEmitter.subscribe( result => {
      this.database = result;
    });

    dataBaseProvider.loadDatabase();
  }

  databaseCall( method: string ) {
    return new Observable<any> ( observer => {

      if(this.database !== null) {
        observer.next(this.database[method]());
        observer.complete();
      } else {
        this.dataBaseProvider.databaseEmitter.subscribe(result => {
            observer.next(result[method]());
            observer.complete();
        });
      }
    });
  }

  getTournamentName(): Observable<string> {
    return this.databaseCall('getTournamentName');
  }

  getRules(): Observable<any> {
    return this.databaseCall('getRules');
  }

  getPlayers(): Observable<Player[]> {
    return this.databaseCall('getPlayers');
  }

  getPods(): Observable<Pod[]> {
    return this.databaseCall('getPods');
  }

  getRound1(): Observable<Match[]> {
    return this.databaseCall('getRonde1');
  }

  getRound2(): Observable<Match[]> {
    return this.databaseCall('getRonde2');
  }

  getRound3(): Observable<Match[]> {
    return this.databaseCall('getRonde3');
  }
}
