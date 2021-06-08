import { variable } from "@angular/compiler/src/output/output_ast";
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
    private _tournamentId: string;
    private _rules: string;
    private _players: Player[];
    private _pods: Pod[];
    private _challenges: Challenge[];
    private _allMatchs : Round[]

    private originOrClassList: OriginOrClassList;

    constructor(data: any, originOrClassList: OriginOrClassList) {

        this.originOrClassList = originOrClassList;
        
        this._tournamentName = data.tournamentName;
        console.log('[System] Welcome to ' + this._tournamentName);

        this._tournamentId = data.tournamentId;
        console.error('tournament id should be with the name of the json no inner the json itself, cause it is create two variable, one in JSON and one in name')
        console.log('[System] Tournament Id is ' + this._tournamentId);

        this._rules = this.constructRules(data.rules);
        console.log("[System] Generate rules with " + this._rules.length + " characters");

        this._challenges = this.constructChallenges(data.challenges);
        console.log('[System] ' + this._challenges.length + ' challenge imported.');

        this._players = this.constructPlayers(data.players);
        console.log('[System] ' + this._players.length + ' players imported.');
    
        this._pods = this.constructPods(data.pods);
        console.log('[System] ' + this._pods.length + ' pods imported.');

        this._allMatchs = this.constructAllMatchs(data.allMatchs);
        console.log('[System] ' + this._allMatchs.length + ' rounds imported.');
    };

    getTournamentName(): string {
        return this._tournamentName;
    }

    getTournamentId(): string {
        return this._tournamentId;
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
        challenges.forEach(challenge => tournamentChallenges.push(this.toChallengeDomain(challenge)));
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

    // POD CONSTRUCTION
    //////////////////////

    private constructPods(pods): Pod[] {
        const tournamentPods: Pod[] = [];
        pods.forEach(pod => tournamentPods.push(this.toPodDomain(pod)));

        this.checkDoublons(tournamentPods);
        this.checkNoPodPlayer(tournamentPods);
        return tournamentPods;
    }

    private toPodDomain(pod): Pod {
        return new Pod(
        this.originOrClassList.getByName(pod.OriginOrClass),
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

    private checkDoublons(tournamentPods: Pod[]) {

        const allPlayer: string[] = [];

        tournamentPods.forEach(pod => {
        pod.playersPseudo.forEach(playerPseudo => {
            if(allPlayer.indexOf(playerPseudo) === -1) {
            allPlayer.push(playerPseudo);
            } else {
            console.error('[DATA ERROR FOR POD]: player', playerPseudo, 'in more than one pod');
            }
        });
        });
    }

    private checkNoPodPlayer (tournamentPods: Pod[]) {
        const players = [...this._players];

        tournamentPods.forEach(pod => {

            pod.playersPseudo.forEach(playerPseudo => players.splice(players.findIndex(player => player.pseudo === playerPseudo), 1));
        });

        if (players.length !== 0) {
            console.error('[DATA ERROR FOR PLAYER]: No pod for this player', players);
        }
    }

    // MATCH CONSTRUCTION
    //////////////////////

    private constructAllMatchs(allMatchs): Round[] {
        const tournamentRounds: Round[] = [];
        allMatchs.forEach(round => tournamentRounds.push(this.toRoundDomain(round)));
        return tournamentRounds;
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
        const pod1 = this.getPodFromOriginOrClass(match.pod1);
        const pod2 = this.getPodFromOriginOrClass(match.pod2);
        return new Match(
        pod1,
        pod2,
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

    private getPodFromOriginOrClass(originOrClassName): Pod {
        const currentOriginOrClass = this.originOrClassList.getByName(originOrClassName);
        const currentPod = this._pods.find(pod => pod.originOrClass === currentOriginOrClass);
        if (currentPod === null || currentPod === undefined) {
        console.error('No pod named ' + originOrClassName + 'found.');
        }
        return currentPod;
    }
}