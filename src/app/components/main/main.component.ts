import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  name = localStorage.getItem ('name');
  lname = localStorage.getItem ('lname');
  myEmail = localStorage.getItem('email');
  zipcode = localStorage.getItem('zipcode');
  id = localStorage.getItem ('id');

  constructor() { }

  ngOnInit() {
  }

  public signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("name");
    localStorage.removeItem("lname");
    localStorage.removeItem("email");
    localStorage.removeItem("zipcode");
  }

}
