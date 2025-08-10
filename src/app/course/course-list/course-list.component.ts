import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EnrollDialogComponent } from '../enroll/enroll-dialog/enroll-dialog.component';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  courses = [
    {
      id: 1,
      title: 'Angular Basics',
      instructor: 'Jane Doe',
      description: 'Learn the fundamentals of Angular and start building apps.',
      image: 'assets/img/angular.png',
    },
    {
      id: 2,
      title: 'React Essentials',
      instructor: 'John Smith',
      description: 'Master the core concepts of React.js including hooks.',
      image: 'assets/img/react.png',
    },
    {
      id: 3,
      title: 'Node.js for Beginners',
      instructor: 'Emily Clark',
      description: 'Understand server-side JS with Node and Express.',
      image: 'assets/img/node.png',
    },
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private gaService: GoogleAnalyticsService
  ) {}

  viewDetails(course: any) {
    this.router.navigate(['navigation/course/course-detail'], {
      queryParams: { id: course.id },
    });
  }

  openEnrollDialog(course: any) {
    // Track dialog open
    this.gaService.trackEvent('enroll_dialog_open', {
      event_category: 'Dialog',
      event_label: 'Enroll Dialog',
      course_name: course?.name || 'Unknown',
    });

    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      width: '450px',
      height: 'auto',
      maxHeight: 'none',
      autoFocus: false,
      panelClass: 'enroll-dialog-panel',
      data: { course },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Track dialog close
      this.gaService.trackEvent('enroll_dialog_close', {
        event_category: 'Dialog',
        event_label: 'Enroll Dialog',
        course_name: course?.name || 'Unknown',
      });
    });
  }
}
