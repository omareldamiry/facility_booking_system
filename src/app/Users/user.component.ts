import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnDestroy {
    // Modes are: 'view', 'edit', 'create'
    mode: string = 'view';
    form: FormGroup;
    
    user: User;
    userIsAuthenticated = false;
    private authStatusSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        if(this.router.url.split('=')[1]) {
            this.mode = this.router.url.split('=')[1].split('&')[0];
        }

        this.userIsAuthenticated = this.authService.getIsAuth();

        // Redirection based on authentication status
        // if(!this.userIsAuthenticated) {
        //     this.router.navigate(['/login']);
        // }

        this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            // this.user = this.authService.getUser();
            
        });

        this.form = new FormGroup({
            'username': new FormControl(null),
            'birthdate': new FormControl(null),
            'occupation': new FormControl(null),
            'phone': new FormControl(null),
            'bio': new FormControl(null)
        });

        
    }

    setMode(mode: string) {
        this.mode = mode;
    }

    onSave() {
        const user: User = {
            id: this.user.id,
            email: this.user.email,
            username: this.form.value.username,
            birthdate: this.form.value.birthdate,
            occupation: this.form.value.occupation,
            phone: this.form.value.phone,
            bio: this.form.value.bio
        };

        console.log(user);
    }

    onSubmit() {
        const user: User = {
            id: null,
            email: this.router.url.split('=')[2],
            username: this.form.value.username,
            birthdate: this.form.value.birthdate,
            occupation: this.form.value.occupation,
            phone: this.form.value.phone,
            bio: this.form.value.bio
        };

        this.authService.createUser(user);

    }

    onChange() {
        console.log(this.form.value.birthdate);
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}