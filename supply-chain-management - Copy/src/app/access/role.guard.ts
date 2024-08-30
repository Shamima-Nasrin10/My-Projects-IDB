import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../authentication/auth.service";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isAuthenticated()) {

      const expectedRole = route.data['expectedRole'];

      const currentRole = this.authService.getUserRole();

      console.log('Expected Role:', expectedRole);
      console.log('Current Role:', currentRole);


      if (currentRole === expectedRole) {
        return true;
      } else {

        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       console.log(this.authService.getToken())
//       return true;
//     } else {
//       this.router.navigate(['/logIn ']);
//       return false;
//     }
//   }


// };
