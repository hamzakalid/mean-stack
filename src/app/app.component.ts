import { Component, OnInit } from '@angular/core';
import "node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Subscription } from 'rxjs';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'App';

  private authListenerSub: Subscription=new Subscription();
  public userIsAutheticated =false;
  constructor(private authService:AuthService){}

  ngOnInit(): void {

    this.authService.autoAuth();

    this.userIsAutheticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener()

    .subscribe(isAutheticated =>{
      this.userIsAutheticated =isAutheticated;
    })
  }

}
