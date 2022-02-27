import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({

    email:new FormControl(null,{
      validators:[
        Validators.required,
        Validators.email,
      ]
    }),
    password:new FormControl(null,{
      validators:[
        Validators.required,
      ]
    }),
  });
  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(){
    console.log(this.loginForm)
  }
}
