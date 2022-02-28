import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuStatues = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuStatues = !this.menuStatues;
  }

}
