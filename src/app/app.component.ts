import { Component, OnInit } from '@angular/core';
import { AuthService } from './Users/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Facility Booking System';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
