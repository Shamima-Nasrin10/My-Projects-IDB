import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../access/userModel/user.model';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  users: UserModel[] = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadUsers(): void {
    this.authService.getAllUsers()
      .subscribe((users) => {

        this.users = users;

      });
  }

approveUser(user: UserModel): void{

this.authService.updateUserRole(user.id, 'user').subscribe(()=>{
  this.loadUsers();
})

}

deleteUser(user: UserModel): void{

this.authService.deleteUser(user.id).subscribe(()=>{
  this.loadUsers();
})

}


}
