import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data-model/data/data.service';

@Component({
  selector: 'pr-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'pseudo', 'challenges', 'agence'];

  participants = [];
  dataSource;

  constructor(private dataService: DataService) {

    this.participants = this.dataService.players;
    this.dataSource = new MatTableDataSource(this.participants);

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}



}
