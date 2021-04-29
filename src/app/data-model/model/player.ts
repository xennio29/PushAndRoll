export class Player {
     public firstName: string;
     public lastName: string;
     public pseudo: string;
     public id: number;
     public challenges?: Challenge[];

     constructor(id: number, firstName: string, lastName: string, pseudo: string, challenges?: string[]) {

        this.missConstruct(id, firstName, lastName, pseudo);

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;
        if (challenges !== undefined) {
            challenges.forEach(challenge => {
                this.challenges.push(this.matchEnum(challenge));
            });
        }
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

    matchEnum(challenge: string): Challenge {
        switch (challenge) {
            case Challenge.challenge1.toString():
                return Challenge.challenge1;
            case Challenge.challenge2.toString():
                return Challenge.challenge2;
            case Challenge.challenge3.toString():
                    return Challenge.challenge3;
            case Challenge.challenge4.toString():
                return Challenge.challenge4;
            case Challenge.challenge5.toString():
                return Challenge.challenge5;
            case Challenge.challenge6.toString():
                return Challenge.challenge6;
            default:
                console.warn('No Challenge match ' + challenge)
                return null;
        }
    }
}

export enum Challenge {
    challenge1,
    challenge2,
    challenge3,
    challenge4,
    challenge5,
    challenge6
}
