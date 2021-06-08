import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseGuard implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tournamentId: string = next.paramMap.get("tournamentId");
    const databaseFound =  tournamentId != null ? this.dataService.selectDatabase(tournamentId) : true;
    if (databaseFound) {
      return true;
    } else {
      return this.router.parseUrl('prout');
    }
  }
}
