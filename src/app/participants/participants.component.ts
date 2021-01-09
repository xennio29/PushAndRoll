import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, DataType } from '../data-model/data/data.service';

@Component({
  selector: 'pr-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'pseudo', 'challenges', 'agence'];

  participants = [];
  dataSource;

  constructor(private dataService: DataService) {

    this.dataService.playerEmitter.subscribe( result => {
      this.participants = result;
      this.dataSource = new MatTableDataSource(this.participants);
      this.dataSource.sort = this.sort;
    });

    this.dataService.askData(DataType.Players);

  }

  ngOnInit(): void {}



}
