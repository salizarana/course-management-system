import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollService {
  private enrollmentsSource = new BehaviorSubject<any[]>([]);
  enrollments$ = this.enrollmentsSource.asObservable();

  private currentEnrollments: any[] = [];

  addEnrollment(enrollment: any) {
    this.currentEnrollments.push(enrollment);
    this.enrollmentsSource.next(this.currentEnrollments);
  }
}
