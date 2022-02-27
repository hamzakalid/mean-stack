import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./auth.module";

@Injectable({providedIn:"root"})

export class AuthService{

  private token!: string;
  private  API_LINK = "http://localhost:3000/api/auth";

  //The class constructor
  constructor(private http:HttpClient,private router:Router){}
  //Function to return the token
  getToken(){
    return this.token;
  }


  creatUser(username:string,email:string,password:string){

    //create new user
    const user : User = {

      username:username,
      email:email,
      password:password,

    }

    this.http.post(this.API_LINK+'/sinup',user)
    .subscribe(res=>{
      this.router.navigateByUrl('/log-in');
    });

  }

  //Login function
  login(email:string,password:string){

    this.http.post<{token:string}>(this.API_LINK+"/login",{email:email,password:password})
    .subscribe(result => {
      this.token = result.token;
    });

  }

}
