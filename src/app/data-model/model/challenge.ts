export class Challenge {
    
    public name: string;
    public iconName: string;
    public description: string;

    constructor(name: string, iconName: string, description: string) {
        this.name = name;
        this.iconName = iconName;
        this.description = description;
    }
}