import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userId: string;
    private authStatusListener = new Subject<boolean>();
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    
    login(email: string, password: string) {
        const authData: AuthData = {
            email,
            password
        };

        this.http.post<{ message: string, userId: string }>(BACKEND_URL + 'login', authData)
        .subscribe(responseData => {
            this.userId = responseData.userId;
            this.authStatusListener.next(true);

            this.router.navigate(['/']);
        }, error => {
            this.authStatusListener.next(false);
        });
    }

    signup(email: string, password: string) {
        const authData: AuthData = {
            email,
            password
        };

        this.http.post(BACKEND_URL + 'signup', authData)
        .subscribe(() => {
            this.router.navigate(['/']);
        }, error => {
            // Placement of this line does not make any sense in terms of error handling
            this.authStatusListener.next(false);
        });

    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }
}