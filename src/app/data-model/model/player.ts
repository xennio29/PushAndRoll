import { Challenge } from "./challenge";

export class Player {
     public firstName: string;
     public lastName: string;
     public pseudo: string;
     public id: number;
     public challenges: Challenge[] = [];

     constructor(id: number, firstName: string, lastName: string, pseudo: string, challenges: Challenge[]) {

        this.missConstruct(id, firstName, lastName, pseudo);

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;
        this.challenges = challenges;
    }
    missConstruct(id: number, firstName: string, lastName: string, pseudo: string) {

        const issue: string[] = []
        if (id === null || id === undefined) { issue.push['id']; }
        if (firstName === null || firstName === undefined) { issue.push['firstName']; }
        if (lastName === null || lastName === undefined) { issue.push['lastName']; }
        if (pseudo === null || pseudo === undefined) { issue.push['pseudo']; }

        if (issue.length !== 0) {
            console.error('[DATA ERROR FOR PLAYER]: on parameter : ', issue.concat(', '));
        }
    }
}
