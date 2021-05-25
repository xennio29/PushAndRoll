import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

  {path: ':TournamentId/participants', component: ParticipantsComponent },

  {path: ':TournamentId/rules', component: RulesComponent },

  {path: ':TournamentId/pods', component: PodsComponent },

  {path: ':TournamentId/planning', component: PlanningComponent },

  {path: ':TournamentId/matchs', component: MatchsComponent },

  {path: ':TournamentId/rankings', component: RankingsComponent },

  { path: ':TournamentId/home', component: HomeComponent },

  { path: 'home', component: GlobalHomeComponent }, // FIX ME temporal option, need to work on that

  { path: '404NotFound', component: NotFound404Component }, // TODO workd on visual

  { path: '', redirectTo: '404NotFound', pathMatch: 'full' },
  { path: '**', redirectTo: '404NotFound', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
