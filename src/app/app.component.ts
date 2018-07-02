import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'ars-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
