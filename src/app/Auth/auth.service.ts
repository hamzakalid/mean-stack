
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from, Subject, timeout } from "rxjs";
import { User } from "./auth.module";

@Injectable({providedIn:"root"})

export class AuthService{

  private authStatusListener = new Subject<boolean>();
  private token!: string;

  private tokenExpiresTimer:any;

  //The class constructor
  constructor(private http:HttpClient,private router:Router){}

  private isAuthenticated= false;
  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  private  API_LINK = "http://localhost:3000/api/auth";

  creatUser(username:string,email:string,password:string){

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


  login(email:string,password:string){
    this.http.post<{token:string,expiresIn:number}>(this.API_LINK+"/login",{email:email,password:password})
    .subscribe(result => {

      this.token = result.token;

      this.setTimer(result.expiresIn);

      const now = new Date();
      const expiresIn = new Date(now.getTime() + result.expiresIn*1000);
      console.log(expiresIn.toISOString());

      this.storeToLocalStorage(this.token,expiresIn);


      if(result.token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true)
        this.router.navigate(['/'])
      }
    })
  }

  logout(){
    this.isAuthenticated = false;
    this.token = '';
    this.authStatusListener.next(false);
    this.router.navigate(['/'])
    this.clearLocalStorage();
    clearTimeout(this.tokenExpiresTimer);
  }


  //store data in local storage

  //this function is used to store the data in local storage
  storeToLocalStorage(token:string,expiresIn:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expiresIn',expiresIn.toISOString());
  }

  //this funcion is used to delete the data from local storage
  clearLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  autoAuth(){

    const authInformation = this.getDataFromLocalStorage();
    const now = new Date();
    // console.log(`1 =  ${authInformation.expiresIn}`);

    const expiresIn = authInformation.expiresIn.getTime() - now.getTime();

    // console.log(`time after calculate =  ${expiresIn}`);

    if(expiresIn > 0){
      console.log(`incondtion =  ${expiresIn}`);
      this.setTimer(expiresIn/1000);
      this.isAuthenticated=true;
      this.authStatusListener.next(true);
    }else{
      // console.log(`No login =  ${expiresIn}`);

    }

  }

  setTimer(expiresIn:number){

    console.log('d='+expiresIn)

    this.tokenExpiresTimer = setTimeout(() => {

        this.logout();

    }, expiresIn * 1000);
  }


  getDataFromLocalStorage(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    // console.log(`from the get()= ${expiresIn}`);


    if(!token || !expiresIn){

      return{
        token:'',
        expiresIn: new Date()
      };
    }


    return {
      token:token,
      expiresIn: new Date(expiresIn)
    }
  }

}
