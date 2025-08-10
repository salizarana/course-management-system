import { Component, OnInit } from '@angular/core';
import { EnrollService } from './enroll.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
})
export class EnrollComponent implements OnInit {
  enrollments: any[] = [];

  constructor(private enrollService: EnrollService) {}

  ngOnInit() {
    this.enrollService.enrollments$.subscribe((data) => {
      this.enrollments = data;
    });
  }
}
