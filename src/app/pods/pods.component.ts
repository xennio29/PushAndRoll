import { Component, OnInit } from '@angular/core';
import { DataService, DataType } from '../data-model/data/data.service';
import { Pod } from '../data-model/model/pod';

@Component({
  selector: 'pr-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.scss']
})
export class PodsComponent implements OnInit {

  pods: Pod[] = [];

  constructor(private dataService: DataService) {
    this.dataService.podEmitter.subscribe( result => {
      this.pods = result;
    });

  }

  ngOnInit(): void {
    this.dataService.askData(DataType.Pods);
  }

}
