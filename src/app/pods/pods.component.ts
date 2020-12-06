import { Component, OnInit } from '@angular/core';
import { PODS } from '../data-model/data/podData';

@Component({
  selector: 'pr-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.scss']
})
export class PodsComponent implements OnInit {

  pods = PODS;

  constructor() {}

  ngOnInit(): void {
  }

}
