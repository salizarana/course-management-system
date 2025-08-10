import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  navigationList = [
    { name: 'Dashboard', url: 'admin-dashboard', icon: 'dashboard' },
    { name: 'Courses', url: 'course/course-list', icon: 'menu_book' },
    { name: 'Enrollments', url: 'enroll', icon: 'person_add' },
    { name: 'Reviews', url: 'review', icon: 'rate_review' },
  ];

  constructor(private router: Router) {}

  dashboard() {
    this.router.navigate(['/admin-dashboard']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
