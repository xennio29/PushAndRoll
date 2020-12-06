import { AllPseudos, PLAYERS } from '../data/playerData';
import { Pod } from './pod';

export class Match {
    public pod1: Pod;
    public pod2: Pod;

    public place1: AllPseudos;
    public place2: AllPseudos;
    public place3: AllPseudos;
    public place4: AllPseudos;
    public place5: AllPseudos;
    public place6: AllPseudos;
    public place7: AllPseudos;
    public place8: AllPseudos;

    constructor(
        pod1: Pod,
        pod2: Pod,
        place1?: AllPseudos,
        place2?: AllPseudos,
        place3?: AllPseudos,
        place4?: AllPseudos,
        place5?: AllPseudos,
        place6?: AllPseudos,
        place7?: AllPseudos,
        place8?: AllPseudos,
    ) {
        this.pod1 = pod1;
        this.pod2 = pod2;

        this.place8 = place8;
        this.place7 = place7;
        this.place6 = place6;
        this.place5 = place5;
        this.place4 = place4;
        this.place3 = place3;
        this.place2 = place2;
        this.place1 = place1;

        /*
        console.log(this.pod1);
        console.log(this.pod2);

        console.log(this.place1);
        console.log(this.place2);
        console.log(this.place3);
        console.log(this.place4);
        console.log(this.place5);
        console.log(this.place6);
        console.log(this.place7);
        console.log(this.place8);
        */

        if (!this.checkPseudoInPod()) {
            console.error('[ERROR in result] call an admin');
        };

    }

    checkPseudoInPod(): boolean {

        let test = true;
        if (this.place8) {
            test = test && this.checkAPlayer(this.place8);
        }

        if (this.place7) {
            test = test && this.checkAPlayer(this.place7);
        }

        if (this.place6) {
            test = test && this.checkAPlayer(this.place6);
        }

        if (this.place5) {
            test = test && this.checkAPlayer(this.place5);
        }

        if (this.place4) {
            test = test && this.checkAPlayer(this.place4);
        }

        if (this.place3) {
            test = test && this.checkAPlayer(this.place3);
        }

        if (this.place2) {
            test = test && this.checkAPlayer(this.place2);
        }

        if (this.place1) {
            test = test && this.checkAPlayer(this.place1);
        }

        return test;

    }

    checkAPlayer(pseudo: AllPseudos): boolean {

        if (pseudo) {
            // Check player is in pod1 and pod2
            const matchPod1 = this.pod1.playersPseudo.find( p => p === pseudo) !== undefined;
            const matchPod2 = this.pod2.playersPseudo.find( p => p === pseudo) !== undefined;
            if (!matchPod1 && !matchPod2) {
                console.error('this player is in neither pod : ', pseudo);
                return false;
            } else {
                return true;
            }

        } else {
            console.error('wrong name player : ', pseudo);
            return false;
        }

    }


}
