import { Player } from './player';
import { Pod } from './pod';

export class Match {
    public date: string;
    public matchName: string;
    public players: Player[];
    public place1: string;
    public place2: string;
    public place3: string;
    public place4: string;
    public place5: string;
    public place6: string;
    public place7: string;
    public place8: string;

    constructor(
        date: string,
        players: Player[],
        place1?: string,
        place2?: string,
        place3?: string,
        place4?: string,
        place5?: string,
        place6?: string,
        place7?: string,
        place8?: string,
    ) {

        this.matchName = "test";
        this.players = players;
        this.date = date;

        this.place8 = place8;
        this.place7 = place7;
        this.place6 = place6;
        this.place5 = place5;
        this.place4 = place4;
        this.place3 = place3;
        this.place2 = place2;
        this.place1 = place1;
    }
}
