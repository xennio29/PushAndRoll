import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-model/data/data.service';
import { Pod } from '../data-model/model/pod';

@Component({
  selector: 'pr-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.scss']
})
export class PodsComponent implements OnInit {

  pods: Pod[];

  constructor(private dataService: DataService) {
    this.pods = this.dataService.pods;
  }

  ngOnInit(): void {
  }

}
