import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  courses = 42;
  students = 120;
  instructors = 8;

  recentActivities = [
    'Course "Angular Basics" was published',
    'New student registered: John Doe',
    'Instructor "Jane Smith" updated her profile',
  ];

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
