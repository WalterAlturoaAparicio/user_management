import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LogService } from '../log.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-log-table',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css'],
})
export class LogTableComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'level', 'message', 'source'];
  dataSource = new MatTableDataSource<any>();
  totalLogs = 100;
  pageSize = 10;
  pageIndex = 0;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    // this.logService.getLogs(this.pageIndex, this.pageSize).subscribe((data) => {
    //   this.dataSource.data = data.logs;
    //   this.totalLogs = data.total;
    // });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadLogs();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
