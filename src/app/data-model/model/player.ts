export class Player {
     public firstName: string;
     public lastName: string;
     public pseudo: string;
     public agence: string;
     public id: number;

     constructor(id: number, firstName: string, lastName: string, pseudo: string, agence: Agence) {

        this.missConstruct(id, firstName, lastName, pseudo, agence);

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;
        this.agence = agence;

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

// TODO : fill with more data
export enum Agence {
    Aeroline1026 = '1026 - Aeroline'
}
