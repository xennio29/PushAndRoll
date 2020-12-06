import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PLAYERS } from '../data-model/data/playerData';

@Component({
  selector: 'pr-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['lastName', 'firstName', 'pseudo', 'agence'];

  participants = PLAYERS;
  dataSource = new MatTableDataSource(this.participants);

  constructor() {

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }



}
