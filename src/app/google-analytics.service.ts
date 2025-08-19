// src/app/services/google-analytics.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(private router: Router) {
    this.listenForRouteChanges();
  }

  trackEvent(eventName: string, params?: { [key: string]: any }) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  trackPageView(url: string, title?: string) {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: url,
        page_title: title || document.title,
      });
    }
  }

  private listenForRouteChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  setUserProperty(name: string, value: any) {
    if (typeof gtag === 'function') {
      gtag('set', { [name]: value });
    }
  }
}
