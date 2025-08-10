import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { EnrollComponent } from './course/enroll/enroll.component';
import { ReviewComponent } from './course/review/review.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'course/course-list', component: CourseListComponent },
      { path: 'course/course-detail', component: CourseDetailComponent },
      { path: 'enroll', component: EnrollComponent },
      { path: 'review', component: ReviewComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
