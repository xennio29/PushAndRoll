import { AllPseudos } from '../data/playerData';

export class Player {
     public firstName: string;
     public lastName: string;
     public pseudo: AllPseudos;
     public agence: string;
     public id: number;

     constructor(id: number, firstName: string, lastName: string, pseudo: AllPseudos, agence: Agence) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;
        this.agence = agence;

     }

}

// TODO : fill with more data
export enum Agence {
    Aeroline1026 = '1026 - Aeroline'
}
