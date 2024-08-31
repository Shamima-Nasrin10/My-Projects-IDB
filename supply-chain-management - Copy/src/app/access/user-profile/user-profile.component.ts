// src/app/components/user-profile/user-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { UserModel } from "../userModel/user.model";
import { AuthService } from "../../authentication/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class UserProfileComponent implements OnInit {
  user!: UserModel;
  errorMessage: string = ''; // Property to store error messages

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Method to load user profile data
  loadUserProfile(): void {
    const storedUser = this.authService.getUserProfileFromStorage();
    if (storedUser) {
      this.user = storedUser; // Assign user details if available
    } else {
      this.errorMessage = 'No user profile found. Please log in again.';
      console.log('Error: User profile not found in storage.');
    }
  }

  // Optional method to handle logout
  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']); // Redirect to login page
  //}
}
