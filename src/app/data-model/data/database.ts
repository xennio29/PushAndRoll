import { Match } from "../model/match";
import { OriginOrClassList } from "../model/OriginOrClass";
import { Player } from "../model/player";
import { Pod } from "../model/pod";


/**
 * This class is containing all needed data.
 */
export class DataBase {


    private _tournamentName: string;
    private _rules: any;
    private _players: Player[];
    private _pods: Pod[];
    private _matchsRonde1: Match[];
    private _matchsRonde2: Match[];
    private _matchsRonde3: Match[];

    private originOrClassList: OriginOrClassList;

    constructor(data: any, originOrClassList: OriginOrClassList) {

        this.originOrClassList = originOrClassList;
        
        this._tournamentName = data.tournamentName;
        console.log('[System] Welcome to ' + this._tournamentName);

        this._rules = data.rules;
        console.log("[System] load " + this._rules.chapters.size + "chapters")
    
        this._players = this.constructPlayers(data.players);
        console.log('[System] ' + this._players.length + ' players imported.');
    
        this._pods = this.constructPods(data.pods);
        console.log('[System] ' + this._pods.length + ' pods imported.');
    
        this._matchsRonde1 = this.constructMatchs(data.matchsRonde1);
        console.log('[System] ' + this._matchsRonde1.length + ' matchs imported for ronde 1');
    
        this._matchsRonde2 = this.constructMatchs(data.matchsRonde2);
        console.log('[System] ' + this._matchsRonde2.length + ' matchs imported for ronde 2');
    
        this._matchsRonde3 = this.constructMatchs(data.matchsRonde3);
        console.log('[System] ' + this._matchsRonde3.length + ' matchs imported for ronde 3');
    };

    getTournamentName() {
        return this._tournamentName;
    }

    getRules() {
        return this._rules;
    }

    getPlayers() {
        return this._players;
    }

    getPods() {
        return this._pods;
    }

    getRonde1() {
        return this._matchsRonde1;
    }

    getRonde2() {
        return this._matchsRonde2;
    }

    getRonde3() {
        return this._matchsRonde3;
    }



    // PLAYER CONSTRUCTION
    //////////////////////

    private constructPlayers(players): Player[] {
        const tournamentPlayers: Player[] = [];

        players.forEach(player => {
        tournamentPlayers.push(this.toPlayerDomain(player));      
        });

        return tournamentPlayers;
    }

    private toPlayerDomain(player): Player {
        return new Player(
        player.id,
        player.firstName,
        player.lastName,
        player.pseudo,
        player.challenges
        );
    }

    // POD CONSTRUCTION
    //////////////////////

    private constructPods(pods): Pod[] {
        const tournamentPods: Pod[] = [];

        pods.forEach(pod => {
        tournamentPods.push(this.toPodDomain(pod));      
        });

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

            pod.playersPseudo.forEach(playerPseudo => {
                players.splice(players.findIndex(player => player.pseudo === playerPseudo), 1)
            });
        });

        if (players.length !== 0) {
            console.error('[DATA ERROR FOR PLAYER]: No pod for this player', players);
        }

    }

    // MATCH CONSTRUCTION
    //////////////////////

    private constructMatchs(matchs): Match[] {
        const tournamentMatchs: Match[] = [];

        matchs.forEach(match => {
        tournamentMatchs.push(this.toMatchDomain(match));      
        });

        return tournamentMatchs;
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