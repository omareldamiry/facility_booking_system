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
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    login(email: string, password: string) {
        const authData: AuthData = {
            email,
            password
        };

        this.http.post<{ message: string, token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login', authData)
            .subscribe(responseData => {
                const token = responseData.token;

                this.userId = responseData.userId;
                this.token = token;

                if (token) {
                    const expiresInDuration = responseData.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.authStatusListener.next(true);

                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(this.userId, token, expirationDate);
                    this.isAuthenticated = true;

                    this.router.navigate(['/']);
                }

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

    logout() {
        this.userId = null;
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        this.clearAuthData();
        clearTimeout(this.tokenTimer);
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getToken() {
        return this.token;
    }

    getUserId() {
        return this.userId;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();

        if (!authInfo) {
            return;
        }

        const now = new Date();
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();

        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.userId = authInfo.userId;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => { this.logout() }, duration * 1000);
    }

    private saveAuthData(userId: string, token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expirationDate');
        const userId = localStorage.getItem('userId');

        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate),   // expirationDate is a Date data type
            userId: userId
        };
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
    }
}