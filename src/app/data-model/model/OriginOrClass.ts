import { Injectable } from "@angular/core";

export class OriginOrClass {

    private englishName: string;
    private frenchName: string;
    private logoPath: string;

    constructor(englishName, frenchName, logoPath) {
        this.englishName = englishName;
        this.frenchName = frenchName;
        this.logoPath = logoPath;
    }

    getEnglishName(): string {
        return this.englishName;
    }

    getFrenchName(): string {
        return this.frenchName;
    }

    getLogoPath() :string {
        return this.logoPath;
    }
}

@Injectable({
    providedIn: 'root'
  })
export class OriginOrClassList {

    private list: Map<EOriginOrClass, OriginOrClass> = new Map();

    constructor() {
        this.list.set(EOriginOrClass.ASSASSIN,
            new OriginOrClass('Assassin', 'Assassin', 'assets/img/OriginOrClass/Assassin_TFT_icon.png'));
        this.list.set(EOriginOrClass.BRAWLER,
            new OriginOrClass('Brawler', 'Bagarreur', 'assets/img/OriginOrClass/Brawler_TFT_icon.png'));
        this.list.set(EOriginOrClass.CAVALIER,
            new OriginOrClass('Cavalier', 'Cavalier', 'assets/img/OriginOrClass/Cavalier_TFT_icon.png'));
        this.list.set(EOriginOrClass.DRACONIC,
            new OriginOrClass('Draconic', 'Draconique', 'assets/img/OriginOrClass/Draconic_TFT_icon.png'));
        this.list.set(EOriginOrClass.RANGER,
            new OriginOrClass('Ranger', 'Eclaireur', 'assets/img/OriginOrClass/Ranger_TFT_icon.png'));
        this.list.set(EOriginOrClass.FORGOTTEN,
            new OriginOrClass('Forgotten', 'Oublié', 'assets/img/OriginOrClass/Forgotten_TFT_icon.png'));
        this.list.set(EOriginOrClass.HELLION,
            new OriginOrClass('Hellion', 'Trublion', 'assets/img/OriginOrClass/Hellion_TFT_icon.png'));
    }

    public get (eOriginOrClass: EOriginOrClass): OriginOrClass {
        return this.list.get(eOriginOrClass);
    }

    public getByName(originOrClassName: string): OriginOrClass {

        let currentOriginOrClass: OriginOrClass = null;
        this.list.forEach(originOrClass => {
            if (originOrClass.getEnglishName() === originOrClassName
                || originOrClass.getFrenchName() === originOrClassName) {
                    return currentOriginOrClass = originOrClass;
            }
        })
        if (currentOriginOrClass !== undefined && currentOriginOrClass != null) {
            return currentOriginOrClass
        } else {
            console.error('no origin or class found with name ' + originOrClassName);
            return null;
        }
    }
}

export enum EOriginOrClass {
    ASSASSIN, // Assassin,
    BRAWLER, // Bagarreur
    CAVALIER, // Cavalier
    DRACONIC, // Draconique
    RANGER, // Eclaireur

    FORGOTTEN, // Oublié
    HELLION, // Trublion
}