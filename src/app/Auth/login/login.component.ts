import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({

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




  ngOnInit(): void {
  }


  onSubmit(){

   this.isLoading = true;

    this.authService.login(this.loginForm.value.email,this.loginForm.value.password);

    this.isLoading = false;
  }
}
