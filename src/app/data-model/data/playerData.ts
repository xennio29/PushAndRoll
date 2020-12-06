import { Agence, Player } from '../model/player';

// Enum use to keep consistency in player name for match
export enum AllPseudos {
    Tatam = 'Tatam',
    ssssylas = 'ssssylas',
    nounou = 'nounou',
    sept = '7',
    Wuk0ng = 'Wuk0ng',
    DEMACIA = 'DEMACIA',
    SwordMan = 'SwordMan',
    leCochon = 'leCochon',
    WeaponGuy = '4WeaponGuy',
    lamb = 'lamb',
    QueenOfTheNorth = 'QueenOfTheNorth',
    WoufWouf = 'WoufWouf',
    Sharknado = 'Sharknado',
    NinjaGirl = 'NinjaGirl',
    SpinGirl = 'SpinGirl',
    exMVP = 'ex-MVP'

}

export const PLAYERS: Player[] = [
    new Player(1, 'Tahm Kench', 'TFT', AllPseudos.Tatam, Agence.Aeroline1026),
    new Player(2, 'Sylas', 'TFT', AllPseudos.ssssylas, Agence.Aeroline1026),
    new Player(3, 'Nunu', 'TFT', AllPseudos.nounou, Agence.Aeroline1026),
    new Player(4, 'Sett', 'TFT', AllPseudos.sept, Agence.Aeroline1026),

    new Player(5, 'Wukong', 'TFT', AllPseudos.Wuk0ng, Agence.Aeroline1026),
    new Player(6, 'Garen', 'TFT', AllPseudos.DEMACIA, Agence.Aeroline1026),
    new Player(7, 'Aatrox', 'TFT', AllPseudos.SwordMan, Agence.Aeroline1026),
    new Player(8, 'Sejuani', 'TFT', AllPseudos.leCochon, Agence.Aeroline1026),

    new Player(9, 'Aphelios', 'TFT', AllPseudos.WeaponGuy, Agence.Aeroline1026),
    new Player(10, 'Kindred', 'TFT', AllPseudos.lamb, Agence.Aeroline1026),
    new Player(11, 'Ashe', 'TFT', AllPseudos.QueenOfTheNorth, Agence.Aeroline1026),
    new Player(12, 'Warwick', 'TFT', AllPseudos.WoufWouf, Agence.Aeroline1026),

    new Player(13, 'Pike', 'TFT', AllPseudos.Sharknado, Agence.Aeroline1026),
    new Player(14, 'Akali', 'TFT', AllPseudos.NinjaGirl, Agence.Aeroline1026),
    new Player(15, 'katarina', 'TFT', AllPseudos.SpinGirl, Agence.Aeroline1026),
    new Player(16, 'Talon', 'TFT', AllPseudos.exMVP, Agence.Aeroline1026),
];
