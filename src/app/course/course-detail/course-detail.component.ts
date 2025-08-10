import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollDialogComponent } from '../enroll/enroll-dialog/enroll-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent {
  course: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.queryParamMap.get('id');

    const courses = [
      {
        id: '1',
        title: 'Angular Basics',
        description: 'Learn all about Angular framework.',
        content: 'Components, Modules, Services, Routing...',
        instructor: 'Jane Doe',
        image: 'assets/img/angular.jpg',
      },
    ];

    this.course = courses.find((c) => c.id === courseId);
  }

  openEnrollDialog(course: any) {
    this.dialog.open(EnrollDialogComponent, {
      width: '450px',
      height: 'auto',
      maxHeight: 'none',
      autoFocus: false,
      panelClass: 'enroll-dialog-panel',
      data: { course },
    });
  }
}
