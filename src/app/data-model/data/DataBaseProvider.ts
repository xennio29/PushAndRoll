import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OriginOrClassList } from "../model/OriginOrClass";
import { DataBase } from "./database";

/**
 * This class create the singleton of all the data extract from a JSON file. 
 */
 @Injectable({
    providedIn: 'root'
  })
export class DataBaseProvider {

    public databaseEmitter: EventEmitter<DataBase> = new EventEmitter();

    constructor(private http: HttpClient, private originOrClassList: OriginOrClassList) {}

    public loadNantesDatabase(): void {
        this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/tournamentDataPushAndRoll-Nantes.json').subscribe(data => {
            const dataBase = new DataBase(data, this.originOrClassList);
            this.databaseEmitter.emit(dataBase);
        });
    }
    public loadToulouseDatabase(): void {
        this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/tournamentDataPushAndRoll-Toulouse.json').subscribe(data => {
            const dataBase = new DataBase(data, this.originOrClassList);
            this.databaseEmitter.emit(dataBase);
        });
    }

    public loadTestDatabse(): void {
        this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/tournamentDataPushAndRoll-Test.json').subscribe(data => {
            const dataBase = new DataBase(data, this.originOrClassList);
            this.databaseEmitter.emit(dataBase);
        });
    }
}