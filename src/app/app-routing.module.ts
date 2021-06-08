import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatabaseGuard } from './data-model/data/database.guard';
import { GlobalHomeComponent } from './global-home/global-home.component';
import { HomeComponent } from './home/home.component';
import { MatchsComponent } from './matchs/matchs.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { ParticipantsComponent } from './participants/participants.component';
import { PlanningComponent } from './planning/planning.component';
import { PodsComponent } from './pods/pods.component';
import { RankingsComponent } from './rankings/rankings.component';
import { RulesComponent } from './rules/rules.component';

export const routes: Routes = [

  {path: ':tournamentId/participants', component: ParticipantsComponent, canActivate: [DatabaseGuard]},

  {path: ':tournamentId/rules', component: RulesComponent, canActivate: [DatabaseGuard]},

  {path: ':tournamentId/pods', component: PodsComponent, canActivate: [DatabaseGuard]},

  {path: ':tournamentId/planning', component: PlanningComponent, canActivate: [DatabaseGuard]},

  {path: ':tournamentId/matchs', component: MatchsComponent, canActivate: [DatabaseGuard]},

  {path: ':tournamentId/rankings', component: RankingsComponent, canActivate: [DatabaseGuard]},

  { path: ':tournamentId/home', component: HomeComponent, canActivate: [DatabaseGuard]},

  { path: 'home', component: GlobalHomeComponent}, // FIX ME temporal option, need to work on that

  { path: '404NotFound', component: NotFound404Component}, // TODO workd on visual

  { path: '', redirectTo: '404NotFound', pathMatch: 'full'},
  { path: '**', redirectTo: '404NotFound', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
