import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../Auth/auth.module';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuStatues = false;

  private authListenerSub: Subscription=new Subscription();
  private userListenerSub: Subscription=new Subscription();

  public userIsAutheticated =false;

  public User:User = {
    username:'',
    email: '',
    password: '',
    profile:''
  }

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.authService.autoAuth()

    this.userIsAutheticated = this.authService.getIsAuth();

    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAutheticated =>{
      this.userIsAutheticated =isAutheticated;
    })

    this.userListenerSub = this.authService.getUserStatusListener()
    .subscribe(user =>{
      console.log("ddddddddd")
      this.User = user;
    })

  }

  toggleMenu() {
    this.menuStatues = !this.menuStatues;
  }
  logout(){
    this.authService.logout();
  }

}
