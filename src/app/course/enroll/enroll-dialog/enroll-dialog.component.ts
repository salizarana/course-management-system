import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollService } from '../enroll.service';

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.scss'],
})
export class EnrollDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private enrollService: EnrollService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      const enrollmentData = {
        course: this.data.course,
        ...this.form.value,
      };
      this.enrollService.addEnrollment(enrollmentData);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
