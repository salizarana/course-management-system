import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  snackBar: any;
  hide: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private gaService: GoogleAnalyticsService
  ) {}

  adminList: any[] = [
    { userId: 1, userName: 'admin', password: 'admin123', userType: 'admin' },
  ];

  userList: any[] = [
    { userId: 2, userName: 'user', password: 'user123', userType: 'user' },
  ];

  formObject: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formObject = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  save() {
    if (this.formObject.valid) {
      const userName = this.formObject.get('userName')?.value.toLowerCase();
      const password = this.formObject.get('password')?.value;

      const user = this.adminList.find(
        (u) =>
          u.userName === userName &&
          u.password === password &&
          u.userType === 'admin'
      );
      const customer = this.userList.find(
        (c) =>
          c.userName === userName &&
          c.password === password &&
          c.userType === 'user'
      );

      if (user) {
        let userData = {
          res: [{ userId: user.userId, userType: user.userType }],
        };
        localStorage.setItem('user', JSON.stringify(userData));

        this.gaService.setUserProperty('user_role', user.userType);

        this.gaService.trackEvent('login', { user_role: user.userType });

        this.router.navigate(['navigation', 'admin-dashboard']);
      } else if (customer) {
        let customerData = {
          res: [{ userId: customer.userId, userType: customer.userType }],
        };
        localStorage.setItem('user', JSON.stringify(customerData));

        this.gaService.setUserProperty('user_role', customer.userType);

        this.gaService.trackEvent('login', { user_role: customer.userType });

        this.router.navigate(['user-dashboard']);
      } else {
        this.invalidLogin();
      }
    }
  }

  invalidLogin() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
      'Invalid username or password',
      'Close',
      { duration: 2000, panelClass: ['snackbar'] }
    );
  }

  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
