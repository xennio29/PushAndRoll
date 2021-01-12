export class Player {
     public firstName: string;
     public lastName: string;
     public pseudo: string;
     public agence: string;
     public id: number;
     public challenges?: Challenges;

     constructor(id: number, firstName: string, lastName: string, pseudo: string, agence: Agence, challenges?: Challenges) {

        this.missConstruct(id, firstName, lastName, pseudo, agence);

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;
        this.agence = agence;
        this.challenges = challenges; 

        

    }

    missConstruct(id: number, firstName: string, lastName: string, pseudo: string, agence: Agence) {

        const issue: string[] = []

        if (id === null || id === undefined) { issue.push['id']; }
        if (firstName === null || firstName === undefined) { issue.push['firstName']; }
        if (lastName === null || lastName === undefined) { issue.push['lastName']; }
        if (pseudo === null || pseudo === undefined) { issue.push['pseudo']; }
        if (agence === null || agence === undefined) { issue.push['agence']; }

        if (issue.length !== 0) {
            console.error('[DATA ERROR FOR PLAYER]: on parameter : ', issue.concat(', '));
        }

    }

}

export enum Agence {
    Aeroline1026 = '1026 - Aeroline',
    Agence588 = '0588 - Cyber Régions + Airbus Conseil & Intégration',
    agence1024 = '1024 - Aero Digital Manufacturing Services Toul',
    agence1030 = '1030 - Aeroline Operations & Industry 4.0 Tlse',
    agence1205 = '1205 - TME Toulouse',
    agence4040 = '4040 - Cards & Payment Solutions',
    agenceOther ='mysterous agence'
}

export class Challenges {

    // Mourir avec 50po
    public missCalculation: boolean = false; // icon calculate

    // Fabriquer trois items avec une spatule
    public FoN: boolean = false; // icon looks_3

    // Avoir avec 4 items identiques
    public quatreALaSuite: boolean = false; // icon filter_4

    // Avoir avec une légendaire 3 étoiles
    public oneV9: boolean = false; // icon star

    // Avoir une trait nécéssitant un élu et une spatule (duelliste, Vanguard, Divines, elderwood, warlord)
    public familyFirst: boolean = false; // icon family_restroom

    // Avoir 5 champion 3 étoiles
    public turboHighrolleur: boolean = false; // refresh


    constructor(
        missCalculation?: boolean,
        FoN?: boolean,
        quatreALaSuite?: boolean,
        oneV9?: boolean,
        familyFirst?: boolean,
        turboHighrolleur?: boolean
    ) {
            this.missCalculation = missCalculation;
            this.FoN = FoN;
            this.quatreALaSuite = quatreALaSuite;
            this.oneV9 = oneV9;
            this.familyFirst = familyFirst;
            this.turboHighrolleur = turboHighrolleur;
     }

}
