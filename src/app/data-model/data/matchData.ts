import { Match } from '../model/match';
import { OriginOrClass } from '../model/pod';
import { AllPseudos } from './playerData';
import { PODS } from './podData';

export const MATCHSRONDE1: Match[] = [

    new Match(
        PODS.find( pod => pod.name === OriginOrClass.Brawler),
        PODS.find( pod => pod.name === OriginOrClass.Vanguard),
        AllPseudos.leCochon, // place1
        AllPseudos.DEMACIA, // place2
        AllPseudos.Tatam, // place3
        AllPseudos.Wuk0ng, // place4
        AllPseudos.nounou, // place5
        AllPseudos.sept, // place6
        AllPseudos.ssssylas, // place7
        AllPseudos.SwordMan, // place8

    ),
    new Match(
        PODS.find( pod => pod.name === OriginOrClass.Assasin),
        PODS.find( pod => pod.name === OriginOrClass.Hunter),
        AllPseudos.WoufWouf, // place1
        AllPseudos.NinjaGirl, // place2
        AllPseudos.Sharknado, // place3
        AllPseudos.QueenOfTheNorth, // place4
        AllPseudos.lamb, // place5
        AllPseudos.SpinGirl, // place6
        AllPseudos.WeaponGuy, // place7
        AllPseudos.exMVP, // place8
    )
];

export const MATCHSRONDE2: Match[] = [

    new Match(
        PODS.find( pod => pod.name === OriginOrClass.Brawler),
        PODS.find( pod => pod.name === OriginOrClass.Hunter)
    ),
    new Match(
        PODS.find( pod => pod.name === OriginOrClass.Assasin),
        PODS.find( pod => pod.name === OriginOrClass.Vanguard)
    )
];

export const MATCHSRONDE3: Match[] = [

    new Match(
        PODS.find( pod => pod.name === OriginOrClass.Brawler),
        PODS.find( pod => pod.name === OriginOrClass.Assasin)
    ),
    new Match(
        PODS.find( pod => pod.name === OriginOrClass.Vanguard),
        PODS.find( pod => pod.name === OriginOrClass.Hunter)
    )
];
