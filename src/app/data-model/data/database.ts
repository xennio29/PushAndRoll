import { Challenge } from "../model/challenge";
import { Match } from "../model/match";
import { OriginOrClassList } from "../model/OriginOrClass";
import { Player } from "../model/player";
import { Pod } from "../model/pod";
import { Round } from "../model/Round";
import { Rules } from "../model/rules";


/**
 * This class is containing all needed data.
 */
export class DataBase {


    private _tournamentName: string;
    private _rules: string;
    private _players: Player[];
    private _pods: Pod[];
    private _challenges: Challenge[];
    private _allMatchs : Round[]

    private mappedPlayers: Map<string, Player>;

    constructor(data: any) {
        
        this._tournamentName = data.tournamentName;
        console.log('[System] Welcome to ' + this._tournamentName);

        this._rules = this.constructRules(data.rules);
        console.log("[System] Generate rules with " + this._rules.length + " characters");

        this._challenges = this.constructChallenges(data.challenges);
        console.log('[System] ' + this._challenges.length + ' challenge imported.');

        this._players = this.constructPlayers(data.players);
        console.log('[System] ' + this._players.length + ' players imported.');

        this.mappedPlayers = this.fromPlayerArrayToPlayerMap(this._players); 

        this._allMatchs = this.constructAllMatchs(data.allMatchs);
        console.log('[System] ' + this._allMatchs.length + ' rounds imported.');
    };

    getTournamentName(): string {
        return this._tournamentName;
    }

    getRules(): string {
        return this._rules;
    }

    getPlayers(): Player[] {
        return this._players;
    }

    getPods(): Pod[] {
        return this._pods;
    }

    getChallenges(): Challenge[] {
        return this._challenges;
    }

    getAllMatchs(): Round[] {
        return this._allMatchs;
    }

    // RULES CONSTRUCTION
    /////////////////////

    private constructRules(rules): string {
        return new Rules(rules).getContent();
    }

     // CHALLENGE CONSTRUCTION
    /////////////////////////

    private constructChallenges(challenges): Challenge[] {
        const tournamentChallenges: Challenge[] = [];
        if (challenges !== undefined) {
            challenges.forEach(challenge => tournamentChallenges.push(this.toChallengeDomain(challenge)));
        }
        return tournamentChallenges;
    }

    private toChallengeDomain(challenge): Challenge {
        return new Challenge(
            challenge.name,
            challenge.icon,
            challenge.description
        )
    }


    // PLAYER CONSTRUCTION
    //////////////////////

    private constructPlayers(players): Player[] {
        const tournamentPlayers: Player[] = [];
        players.forEach(player => tournamentPlayers.push(this.toPlayerDomain(player)));
        return tournamentPlayers;
    }

    private toPlayerDomain(player): Player {
        const challenges: Challenge[] = [];
        if(player.challenges !== undefined) {
            player.challenges.forEach(challengeName => {
                const foundChallenge = this._challenges.find(challenge => challenge.name === challengeName);
                if (foundChallenge !== undefined) {
                    challenges.push(foundChallenge);
                } else {
                    console.error("No correponding Challenge found for " + challengeName);
                }
            });
        }
        return new Player(
        player.id,
        player.firstName,
        player.lastName,
        player.pseudo,
        challenges
        );
    }

    // MATCH CONSTRUCTION
    //////////////////////

    private constructAllMatchs(allMatchs): Round[] {
        if (allMatchs != undefined) {
            const tournamentRounds: Round[] = [];
            allMatchs.forEach(round => tournamentRounds.push(this.toRoundDomain(round)));
            return tournamentRounds;
        }
        return this.mockAllMatchs();
    }

    private toRoundDomain(round): Round {
        const roundMatch: Match[] = [];
        round.matchs.forEach (match => roundMatch.push(this.toMatchDomain(match)));
        return new Round(
            round.description,
            roundMatch
        );
    }

    private toMatchDomain(match): Match {
        return new Match(
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

    
    private fromPlayerArrayToPlayerMap(players: Player[]): Map<string, Player> {
        const map = new Map<string, Player>();
        players.forEach( player => map.set(player.pseudo, player));
        return map;
    }

    // MOCK MATCHS
    //////////////////////////////

    private mockAllMatchs(): Round[]  {
        const tournamentRounds: Round[] = [];

        const round1 = this.mockRound1();
        tournamentRounds.push(round1);

        const round2 = this.mockRound2();
        tournamentRounds.push(round2);

        return tournamentRounds;
    }

    private mockRound1():Round {
        const round1Matchs = this.mockRound1Matchs();
        const round1 = new Round(
            "First Round",
            round1Matchs
        );
        return round1;
    }

    private mockRound2():Round {
        const round2Matchs = this.mockRound2Matchs();
        const round2 = new Round(
            "Second Round",
            round2Matchs
        );
        return round2;
    }

    private mockRound1Matchs(): Match[] {
        const round1Matchs: Match[] = [];

        const round1Match1 = this.mockRound1Match1();
        round1Matchs.push(round1Match1);

        const round1Match2 = this.mockRound1Match2();
        round1Matchs.push(round1Match2);

        const round1Match3 = this.mockRound1Match3();
        round1Matchs.push(round1Match3);

        return round1Matchs;
    }

    private mockRound1Match1() {
        const players = [
            this.mappedPlayers.get("Xennio"),
            this.mappedPlayers.get("DKingyo"),
            this.mappedPlayers.get("Starliight71"),
            this.mappedPlayers.get("Xeyway"),
            this.mappedPlayers.get("Yieras")
        ]
        this.mappedPlayers.get("test")
        return new Match("16 mars - 20h30", "Match 1 of Round 1", players);
    }

    private mockRound1Match2() {
        const players = [
            this.mappedPlayers.get("Xennio"),
            this.mappedPlayers.get("DKingyo"),
            this.mappedPlayers.get("Starliight71"),
            this.mappedPlayers.get("Xeyway"),
            this.mappedPlayers.get("Yieras")
        ]
        this.mappedPlayers.get("test")
        return new Match("16 mars - 21h30", "Match 2 of Round 1", players);
    }

    private mockRound1Match3() {
        const players = [
            this.mappedPlayers.get("Xennio"),
            this.mappedPlayers.get("DKingyo"),
            this.mappedPlayers.get("Starliight71"),
            this.mappedPlayers.get("Xeyway"),
            this.mappedPlayers.get("Yieras")
        ]
        this.mappedPlayers.get("test")
        return new Match("16 mars - 22h30", "Match 3 of Round 1", players);
    }

    private mockRound2Matchs(): Match[] {
        return [];
    }

}