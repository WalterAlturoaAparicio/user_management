import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-log-graphs',
  templateUrl: './log-graphs.component.html',
  styleUrls: ['./log-graphs.component.css']
})
export class LogGraphsComponent implements OnInit {
  barChart: any;
  lineChart: any;

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    // this.logService.getLogMetrics().subscribe((data) => {
    //   this.createBarChart(data.errorDistribution);
    //   this.createLineChart(data.logFrequency);
    // });
  }

  createBarChart(errorDistribution: any[]) {
    const labels = errorDistribution.map((item) => item.level);
    const counts = errorDistribution.map((item) => item.count);

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Error Distribution', data: counts, backgroundColor: '#3f51b5' }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  }

  createLineChart(logFrequency: any[]) {
    const timestamps = logFrequency.map((item) => item.timestamp);
    const counts = logFrequency.map((item) => item.count);

    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{ label: 'Log Frequency', data: counts, borderColor: '#ff9800', fill: false }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  }
}
