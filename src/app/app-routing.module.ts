import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchsComponent } from './matchs/matchs.component';
import { ParticipantsComponent } from './participants/participants.component';
import { PlanningComponent } from './planning/planning.component';
import { PodsComponent } from './pods/pods.component';
import { RankingsComponent } from './rankings/rankings.component';
import { RulesComponent } from './rules/rules.component';

export const routes: Routes = [
  {path: 'participants', component: ParticipantsComponent },

  {path: 'rules', component: RulesComponent },

  {path: 'pods', component: PodsComponent },

  {path: 'planning', component: PlanningComponent },

  {path: 'matchs', component: MatchsComponent },

  {path: 'rankings', component: RankingsComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
