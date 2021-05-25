import { Match } from "./match";

export class Round {

    description: string;
    matchs: Match[];
    
    constructor(description: string, matchs: Match[]) {
        this.description = description;
        this.matchs = matchs;
    }
}