import { AllPseudos } from '../data/playerData';
import { Player } from './player';

export class Pod {

    public name: OriginOrClass;
    public readonly playersPseudo: AllPseudos[] = [];

    constructor(name: OriginOrClass,
                player1: AllPseudos, player2: AllPseudos, player3: AllPseudos, player4: AllPseudos) {
        this.name = name;
        this.playersPseudo.push(player1);
        this.playersPseudo.push(player2);
        this.playersPseudo.push(player3);
        this.playersPseudo.push(player4);

    }

    getOriginOrClassName(): OriginOrClassName {

        switch (this.name) {
            case OriginOrClass.Cultist:
                return new OriginOrClassName('Cultist', 'Fanatique');
            case OriginOrClass.Divine:
                return new OriginOrClassName('Divine', 'Divin');
            case OriginOrClass.Dusk:
                return new OriginOrClassName('Dusk', 'Crépuscule');
            case OriginOrClass.Enligntened:
                return new OriginOrClassName('Enligntened', 'Sage');
            case OriginOrClass.Elderwood:
                return new OriginOrClassName('Elderwood', 'Sylvestre');
            case OriginOrClass.Fortune:
                return new OriginOrClassName('Fortune', 'Nantis');
            case OriginOrClass.Moonlight:
                return new OriginOrClassName('Moonlight', 'Sélénite');
            case OriginOrClass.Ninja:
                return new OriginOrClassName('Ninja', 'Ninja');
            case OriginOrClass.Spirit:
                return new OriginOrClassName('Spirit', 'Esprit');
            case OriginOrClass.Warlord:
                return new OriginOrClassName('Warlord', 'Maître de guerre');
            case OriginOrClass.Assasin:
                return new OriginOrClassName('Assasin', 'Assasin');
            case OriginOrClass.Brawler:
                return new OriginOrClassName('Brawler', 'Bagarreur');
            case OriginOrClass.Dazzler:
                return new OriginOrClassName('Dazzler', 'Envoûteur');
            case OriginOrClass.Duelist:
                return new OriginOrClassName('Duelist', 'Duelistes');
            case OriginOrClass.Hunter:
                return new OriginOrClassName('Hunter', 'Chasseur');
            case OriginOrClass.Keeper:
                return new OriginOrClassName('Keeper', 'Sentinelle');
            case OriginOrClass.Mage:
                return new OriginOrClassName('Mage', 'Mage');
            case OriginOrClass.Mystic:
                return new OriginOrClassName('Mystic', 'Mystique');
            case OriginOrClass.Sharpshooter:
                return new OriginOrClassName('Sharpshooter', 'Tireur d\'élite');
            case OriginOrClass.Vanguard:
                return new OriginOrClassName('Vanguard', 'Initiateur');

        }
    }

    getOriginOrClassLogo(): string {
        switch (this.name) {
            case OriginOrClass.Cultist:
                return 'assets/img/OriginOrClass/Cultist_TFT_icon.png';
            case OriginOrClass.Divine:
                return '';
            case OriginOrClass.Dusk:
                return '';
            case OriginOrClass.Enligntened:
                return '';
            case OriginOrClass.Elderwood:
                return '';
            case OriginOrClass.Fortune:
                return '';
            case OriginOrClass.Moonlight:
                return '';
            case OriginOrClass.Ninja:
                return '';
            case OriginOrClass.Spirit:
                return '';
            case OriginOrClass.Warlord:
                return '';
            case OriginOrClass.Assasin:
                return 'assets/img/OriginOrClass/Assassin_TFT_icon.png';
            case OriginOrClass.Brawler:
                return 'assets/img/OriginOrClass/Brawler_TFT_icon.png';
            case OriginOrClass.Dazzler:
                return '';
            case OriginOrClass.Duelist:
                return '';
            case OriginOrClass.Hunter:
                return 'assets/img/OriginOrClass/Hunter_TFT_icon.png';
            case OriginOrClass.Keeper:
                return '';
            case OriginOrClass.Mage:
                return '';
            case OriginOrClass.Mystic:
                return '';
            case OriginOrClass.Sharpshooter:
                return '';
            case OriginOrClass.Vanguard:
                return 'assets/img/OriginOrClass/Vanguard_TFT_icon.png';

        }
    }

}

export enum OriginOrClass {
    Cultist,
    Divine,
    Dusk,
    Enligntened,
    Elderwood,
    Fortune,
    Moonlight,
    Ninja,
    Spirit,
    Warlord,
    Assasin,
    Brawler,
    Dazzler,
    Duelist,
    Hunter,
    Keeper,
    Mage,
    Mystic,
    Sharpshooter,
    Vanguard
}

export class OriginOrClassName {

    public francais: string;
    public english: string;

    constructor(francais, english) {
        this.francais = francais;
        this.english = english;
    }
}
