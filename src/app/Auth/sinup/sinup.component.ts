import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.css']
})
export class SinupComponent implements OnInit {

  sinupForm = new FormGroup({

  });
  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(){

  }

}
