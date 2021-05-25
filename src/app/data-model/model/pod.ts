import { OriginOrClass } from "./OriginOrClass";

export class Pod {

    public originOrClass: OriginOrClass;
    public readonly playersPseudo: string[] = [];

    constructor(originOrClass: OriginOrClass,
                player1: string, player2: string, player3: string, player4: string) {
        this.originOrClass = originOrClass;
        this.playersPseudo.push(player1);
        this.playersPseudo.push(player2);
        this.playersPseudo.push(player3);
        this.playersPseudo.push(player4);
    }
}