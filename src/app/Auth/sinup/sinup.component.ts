import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent implements OnInit {

  isLoading = false;

  sinupForm = new FormGroup({
    name:new FormControl('',{
      validators:[
        Validators.required,
      ]
    }),
    email:new FormControl('',{
      validators:[
        Validators.required,
        Validators.email,
      ]
    }),
    password:new FormControl('',{
      validators:[
        Validators.required,
      ]
    }),
  });
  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.isLoading=true;
    this.authservice.creatUser(this.sinupForm.value.name,this.sinupForm.value.email,this.sinupForm.value.password)
    this.isLoading =false;
  }

}
