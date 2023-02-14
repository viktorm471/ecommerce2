import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap  } from 'rxjs';
import { USERS_REGISTER_URL, USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // when you need to oberserve your user without modifying outside
  // declare a usersubjetct as observable (it's the same like the getter in foodservices)
  // to get the object of the obeservable you need to subscribe to the observable
  // this allows you to get a state in whole application, and react when the observable changes
  // (like redux) finally you need to save the state in the local storage or cookies

  private userSubject= new BehaviorSubject<User>(this.getCartToLocalStorage());
  public userObservable: Observable<User>


  constructor(
    private http:HttpClient,
    private toastrService: ToastrService
    ) {
    this.userObservable = this.userSubject.asObservable();
   }
  //  pipe when you need to only show the object of the obeservable


  login(userLogin: IUserLogin): Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: user => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            "welcome to foodmine "+ user.name,
            "login successful"

          )

        },
        error: err => {
          this.toastrService.error(err.error, "login failed");
        }
      })
    );
   }

  logout()  {
    this.userSubject.next(new User());
    localStorage.removeItem("User")
    window.location.reload();
  }

  register(userRegister: IUserRegister): Observable<User>{
    return this.http.post<User>(USERS_REGISTER_URL, userRegister).pipe(
      tap({
        next: user => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            "welcome to foodmine "+ user.name,
            "Register successful"

          )

        },
        error: err => {
          this.toastrService.error(err.error, "login failed");
        }
      })
    );
  }

  private setUserToLocalStorage(user:User):void{
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getCartToLocalStorage(): User{
    const cartJson= localStorage.getItem('User');
    return cartJson ? JSON.parse(cartJson) as User : new User();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }
}
