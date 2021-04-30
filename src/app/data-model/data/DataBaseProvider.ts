import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

    private dataBase: DataBase = null;

    constructor(private http: HttpClient, private originOrClassList: OriginOrClassList) {}
    
    public loadDatabase(): Observable<DataBase> {

        return new Observable<DataBase> ((observer) => {

            if (this.dataBase === null) {
                console.log('database not load, fetching json file');
                this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/tournamentDataPushAndRoll2.json').subscribe(data => {
                    console.log('json fetch');
                    this.dataBase = new DataBase(data, this.originOrClassList);
                    observer.next(this.dataBase);
                    observer.complete();
                });
            } else {
                console.log('database already load, send existing database');
                observer.next(this.dataBase);
                observer.complete();
            }
        });
    }
}