import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserModel } from '../access/userModel/user.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from './auth-reponse';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:3000/users";
  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser$!: Observable<UserModel | null>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedUser = this.isBrowser() ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  checkEmailExists(email: string): Observable<boolean> {
    let params = new HttpParams().append('email', email);
    return this.http.get<UserModel[]>(`${this.baseUrl}`, { params }).pipe(
      map(users => users.length > 0),
      catchError(err => {
        console.error('Error checking email existence:', err);
        return of(false);
      })
    );
  }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  registration(user: UserModel): Observable<AuthResponse> {
    return this.http.post<UserModel>(this.baseUrl, user).pipe(
      map((newUser: UserModel) => {
        const token = btoa(`${newUser.email}${newUser.password}`);
        return { token, user: newUser } as AuthResponse;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }


  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    let params = new HttpParams().append('email', credentials.email);

    console.log(credentials.email);

    return this.http.get<UserModel[]>(`${this.baseUrl}`, { params }).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === credentials.password) {
            if (user.role !== 'Pending') {  // Check user role
              const token = btoa(`${user.email}:${user.password}`);
              this.storeToken(token);
              this.setCurrentUser(user);


              this.currentUserSubject.next(user);
              return { token, user } as AuthResponse;
            } else {

              this.currentUserSubject.next(null);
              throw new Error('Your account is pending approval. Please contact an admin.');
            }
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }


  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }


  logout(): void {
    this.clearCurrentUser();
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }


  private setCurrentUser(user: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log("From Local Storage"+ localStorage.getItem('currentUser'));
    }
    this.currentUserSubject.next(user);
  }


  private clearCurrentUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }


  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}`);
  }


  getUserRole(): any   {
    return this.currentUserValue?.role ;
  }


  storeToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }


  storeUserProfile(user: UserModel): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log("User Details "+user);
    }
  }


  getUserProfileFromStorage(): UserModel | null {
    if (this.isBrowser()) {
      const userProfile = localStorage.getItem('currentUser');
      return userProfile ? JSON.parse(userProfile) : null;

      console.log("userProfile Details "+userProfile);
    }
    return null;
  }


  removeUserDetails(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }


  updateUser(userId: string, userData: Partial<UserModel>): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.baseUrl}/${userId}`, userData);
  }


  updateUserRole(userId: string, newRole: string): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.baseUrl}/${userId}`, { role: newRole });
  }


  deleteUser(userId: UserModel): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
