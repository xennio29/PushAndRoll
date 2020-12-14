import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/data-model/model/player';
import { OriginOrClassName, Pod } from 'src/app/data-model/model/pod';

@Component({
  selector: 'pr-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.scss']
})
export class PodComponent implements OnInit {

  @Input() pod: Pod;

  playersPod: string[] = [];
  logo: string;
  name: OriginOrClassName;


  constructor() {}

  ngOnInit(): void {

    this.logo = this.pod.getOriginOrClassLogo();
    this.pod.playersPseudo.forEach(pseudo => {
      this.playersPod.push(pseudo);
    });

    this.name = this.pod.getOriginOrClassName();
  }

}
