import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  sForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {

    this.sForm = new FormGroup ({
      'name' : new FormControl ('', Validators.compose(
        [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z-`]*')])),
      'lastname': new FormControl ('', Validators.compose(
        [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z-`]*')])),
      'email': new FormControl ('', Validators.compose(
        [Validators.required, Validators.email, Validators.maxLength(75)])),
      'password': new FormControl ('', Validators.required),
      'zipcode': new FormControl ('', Validators.compose(
        [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]*')]))
    });

  }

  onSignup(form: NgForm) {
    this.authService.createUser(
      form.value.email,
      form.value.password,
      form.value.name,
      form.value.lastname,
      form.value.zipcode
      );
  }

  onSubmit() {
    console.log('form submit' + this.sForm.value);
  }





}
