import { Component } from '@angular/core';
import { DataService } from '../data-model/data/data.service';
import { Pod } from '../data-model/model/pod';

@Component({
  selector: 'pr-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.scss']
})
export class PodsComponent{

  pods: Pod[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getPods().subscribe( result => {
      this.pods = result;
    });
  }
}
