import { Pod } from './pod';

export class Match {
    public pod1: Pod;
    public pod2: Pod;
    public date: string;
    public matchName: string;

    public place1: string;
    public place2: string;
    public place3: string;
    public place4: string;
    public place5: string;
    public place6: string;
    public place7: string;
    public place8: string;

    constructor(
        pod1: Pod,
        pod2: Pod,
        date: string,
        place1?: string,
        place2?: string,
        place3?: string,
        place4?: string,
        place5?: string,
        place6?: string,
        place7?: string,
        place8?: string,
    ) {
        this.pod1 = pod1;
        this.pod2 = pod2;

        this.defineMatchName();

        this.date = date;

        this.place8 = place8;
        this.place7 = place7;
        this.place6 = place6;
        this.place5 = place5;
        this.place4 = place4;
        this.place3 = place3;
        this.place2 = place2;
        this.place1 = place1;

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

    checkAPlayer(pseudo: string): boolean {

        // Check player is in pod1 and pod2
        const matchPod1 = this.pod1.playersPseudo.find( p => p === pseudo) !== undefined;
        const matchPod2 = this.pod2.playersPseudo.find( p => p === pseudo) !== undefined;
        if (!matchPod1 && !matchPod2) {
            console.error('[DATA ERROR FOR MATCH', this.pod1.originOrClass.getEnglishName(),
                '&', this.pod2.originOrClass.getEnglishName(),
                ']: player', pseudo, 'is in neither pod');
            return false;
        } else {
            return true;
        }

    }

    private defineMatchName() {
        this.matchName = this.pod1.originOrClass.getFrenchName() + ' et ' + this.pod2.originOrClass.getFrenchName()
        + ' // ' + this.pod1.originOrClass.getEnglishName() + ' and ' + this.pod2.originOrClass.getEnglishName();
    }


}
