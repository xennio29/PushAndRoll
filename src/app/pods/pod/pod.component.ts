import { Component, Input, OnInit } from '@angular/core';
import { Pod } from 'src/app/data-model/model/pod';

@Component({
  selector: 'pr-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.scss']
})
export class PodComponent implements OnInit {

  @Input() pod: Pod;

  playersPod: string[] = [];
  logo: string;
  englishName: string;
  frenchName: string;

  constructor() {}

  ngOnInit(): void {

    const originOrClassPod = this.pod.originOrClass;
    this.englishName = originOrClassPod.getEnglishName();
    this.frenchName = originOrClassPod.getFrenchName();
    this.logo = originOrClassPod.getLogoPath();
    this.pod.playersPseudo.forEach(pseudo => {
      this.playersPod.push(pseudo);
    });
  }
}
