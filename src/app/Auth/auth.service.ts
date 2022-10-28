
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from, Subject, Subscription, timeout } from "rxjs";
import { User } from "./auth.module";

@Injectable({providedIn:"root"})

export class AuthService{

  private currentUser:User={
    username:'',
    password:'',
    email: '',
    profile:'',
  };

  private userUpdate= new Subject<User>();

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

  getUserStatusListener(){
    return this.userUpdate;
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
      profile : ''
    }

    this.http.post(this.API_LINK+'/sinup',user)
    .subscribe(res=>{
      this.router.navigateByUrl('/log-in');
    });

  }


  login(email:string,password:string){
    this.http.post<{token:string,expiresIn:number,user:User}>(this.API_LINK+"/login",{email:email,password:password})
    .subscribe(result => {

      this.token = result.token;
      this.currentUser =result.user;
      this.setTimer(result.expiresIn);

      const now = new Date();
      const expiresIn = new Date(now.getTime() + result.expiresIn*1000);

      // console.log(result);


      this.storeToLocalStorage(this.token,expiresIn,this.currentUser);

      if(result.token){
        this.isAuthenticated = true;

        this.authStatusListener.next(true)

        this.userUpdate.next(this.currentUser);
        this.router.navigate(['/'])
      }
    })
  }

  logout(){
    this.isAuthenticated = false;
    this.token = '';
    this.authStatusListener.next(false);
    this.userUpdate.next({username:'',password:'',email:'',profile:''});
    this.router.navigate(['/'])
    this.clearLocalStorage();
    clearTimeout(this.tokenExpiresTimer);
  }


  //store data in local storage

  //this function is used to store the data in local storage
  storeToLocalStorage(token:string,expiresIn:Date,currentUser:User){
    localStorage.setItem('username',currentUser.username);
    localStorage.setItem('email',currentUser.email);
    localStorage.setItem('profile',currentUser.profile);
    localStorage.setItem('token',token);
    localStorage.setItem('expiresIn',expiresIn.toISOString());
  }

  //this funcion is used to delete the data from local storage
  clearLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('profile');
  }

  autoAuth(){

    const authInformation = this.getDataFromLocalStorage();
    const now = new Date();
    // console.log(`1 =  ${authInformation.expiresIn}`);

    this.token =authInformation.token;

    const expiresIn = authInformation.expiresIn.getTime() - now.getTime();

    // console.log(`time after calculate =  ${expiresIn}`);

    if(expiresIn > 0){

      this.setTimer(expiresIn/1000);

      this.isAuthenticated=true;
      this.authStatusListener.next(true);

      this.currentUser = {
        username:""+authInformation.username,
        email:""+authInformation.email,
        profile:""+authInformation.profile,
        password:""
      };

      this.userUpdate.next(this.currentUser);


    }else{
      // console.log(`No login =  ${expiresIn}`);

    }

  }

  setTimer(expiresIn:number){

    // console.log('d='+expiresIn)

    this.tokenExpiresTimer = setTimeout(() => {

        this.logout();

    }, expiresIn * 1000);
  }


  getDataFromLocalStorage(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const profile = localStorage.getItem('profile');

    // console.log(`from the get()= ${expiresIn}`);


    if(!token || !expiresIn){

      return{
        token:'',
        expiresIn: new Date()
      };
    }


    return {
      username:username,
      email:email,
      profile:profile,
      token:token,
      expiresIn: new Date(expiresIn)
    }
  }



  profileUpdate(profile:File){

    const formData:FormData = new FormData();
    formData.append('profile',profile);
    formData.append('token',""+localStorage.getItem('token'));

    this.http.post<{msg:string,success:boolean,profile:string}>(this.API_LINK+'/profile',formData)
    .subscribe(res=>{
      // console.log(res);

      localStorage.removeItem('profile');
      localStorage.setItem('profile',res.profile);

      let data = this.getDataFromLocalStorage();

      let user = {
        username:"" + data.username,
        email:"" + data.email,
        profile:"" + data.profile,
        password:''
      }

      this.currentUser = user;

      this.userUpdate.next(this.currentUser);

    });

  }
}
