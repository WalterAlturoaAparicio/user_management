import { Component } from '@angular/core';
import { LogGraphsComponent } from './log-graph/log-graph.component';
import { LogTableComponent } from './log-table/log-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatTabsModule,
    LogGraphsComponent,
    LogTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
