import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../Users/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    title: string = 'Facility Booking System';
    isAuthenticated: boolean = false;
    private authStatusSub: Subscription;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.isAuthenticated = this.authService.getIsAuth();

        this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        });
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}