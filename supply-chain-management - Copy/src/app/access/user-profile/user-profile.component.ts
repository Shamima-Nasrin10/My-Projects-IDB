import { Component } from '@angular/core';
import {UserModel} from "../userModel/user.model";
import {UserprofileService} from "../user-profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user!: UserModel;

  constructor(private userprofileService: UserprofileService,
              private router: Router

  ) { }

  ngOnInit(): void {
    this.loadUserProfile();

  }

  loadUserProfile(): void {

    this.userprofileService.getUserProfile()
      .subscribe({
        next:(user)=>{
          if(user){
            this.user=user;


          }
        },
        error:error=>{
          console.log('error user profile',error);
        }

      });

  }

}
