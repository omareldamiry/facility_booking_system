import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

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
        const authData: User = {
            email,
            password
        };

        this.http.post<{ message: string, userId: string }>(BACKEND_URL, authData)
        .subscribe(responseData => {
            this.userId = responseData.userId;
            this.authStatusListener.next(true);

            this.router.navigate(['/']);
        });
    }
}