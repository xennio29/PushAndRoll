import { OriginOrClass, Pod } from '../model/pod';
import { AllPseudos } from './playerData';

export const PODS: Pod[] = [
    new Pod(OriginOrClass.Brawler, AllPseudos.Tatam, AllPseudos.ssssylas, AllPseudos.nounou, AllPseudos.sept),
    new Pod(OriginOrClass.Vanguard, AllPseudos.DEMACIA, AllPseudos.Wuk0ng, AllPseudos.SwordMan, AllPseudos.leCochon),
    new Pod(OriginOrClass.Hunter, AllPseudos.WeaponGuy, AllPseudos.lamb, AllPseudos.QueenOfTheNorth, AllPseudos.WoufWouf),
    new Pod(OriginOrClass.Assasin, AllPseudos.Sharknado, AllPseudos.NinjaGirl, AllPseudos.SpinGirl, AllPseudos.exMVP)
];
