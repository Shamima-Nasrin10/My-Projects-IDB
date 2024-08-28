import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  regForm!: FormGroup;

constructor(
  private authService: AuthService,
  private router: Router,
  private formBuilder: FormBuilder
){
  this.regForm=this.formBuilder.group({
    name:[''],
    email:[''],
    password:[''],
  })
}

}
