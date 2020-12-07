import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParticipantsComponent } from './participants/participants.component';
import { RulesComponent } from './rules/rules.component';
import { RankingsComponent } from './rankings/rankings.component';
import { MaterialModule } from './core/material/material.module';
import { PodsComponent } from './pods/pods.component';
import { PodComponent } from './pods/pod/pod.component';
import { MatchsComponent } from './matchs/matchs.component';
import { MatchComponent } from './matchs/match/match.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    ParticipantsComponent,
    RulesComponent,
    RankingsComponent,
    PodsComponent,
    PodComponent,
    MatchsComponent,
    MatchComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
