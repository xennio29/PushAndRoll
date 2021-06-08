import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Challenge } from '../model/challenge';
import { Player } from '../model/player';
import { Pod } from '../model/pod';
import { Round } from '../model/Round';
import { DataBase } from './database';
import { DataBaseProvider } from './DataBaseProvider';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* The database once it's import. */
  private database: DataBase = null;

  private tournamentId: String = "";

  constructor(private dataBaseProvider: DataBaseProvider, private router: Router) { 
    dataBaseProvider.databaseEmitter.subscribe( result => this.database = result);
  }

  selectDatabase(databaseLabel: string): boolean {
    if (this.tournamentId !== databaseLabel) {
      switch (databaseLabel) {
        case "ToulouseLeVrai":
          this.dataBaseProvider.loadToulouseDatabase();
          this.tournamentId = databaseLabel;
          return true
        case "Nantes":
          this.dataBaseProvider.loadNantesDatabase();
          this.tournamentId = databaseLabel;
          return true
        case "Testing":
          this.dataBaseProvider.loadTestDatabase();
          this.tournamentId = databaseLabel;
          return true
        default: 
          return false;
      }
    }
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

  getTournamentId(): Observable<string> {
    return this.databaseCall('getTournamentId');
  }

  getRules(): Observable<string> {
    return this.databaseCall('getRules');
  }

  getPlayers(): Observable<Player[]> {
    return this.databaseCall('getPlayers');
  }

  getPods(): Observable<Pod[]> {
    return this.databaseCall('getPods');
  }

  getChallenges(): Observable<Challenge[]> {
    return this.databaseCall('getChallenges');
  }

  getAllMatch(): Observable<Round[]> {
    return this.databaseCall('getAllMatchs');
  }
}
