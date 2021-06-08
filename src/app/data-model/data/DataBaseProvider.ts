import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
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

    constructor(private http: HttpClient, private originOrClassList: OriginOrClassList) { }

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

    public loadTestDatabase(): void {
        this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/feature/multi-tournament/src/assets/tournamentDataPushAndRoll-Test.json').subscribe(data => {
            const dataBase = new DataBase(data, this.originOrClassList);
            this.databaseEmitter.emit(dataBase);
        });
    }
}


// TODO plus tard

// faire une méthode badass avec simplement un string en entrée (secrétement l'id du tournoi)
// et faire fouiller le dossier asset à la recherche des database et si y'en a une qui match l'id on la charge sinon on crash -> go to default home page
// Du coup le load et dynamic et y'a rien à faire.
// et c'est badass et c'est pas si dur.
// mais il faut un dossier spécifique dans assets et une id écrite dans le titre du JSON
