import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent  implements OnInit {
  registerForm!: FormGroup;
  isSubmitted: boolean= false;
  returnUrl=""

  constructor(
   private formBuilder:FormBuilder,
   private activatedRoute: ActivatedRoute,
   private userServices:UserService,
   private router:Router
  ) {}

  ngOnInit():void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required, Validators.minLength(6)]) ],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      address: ['', Validators.required]
    }
    ,{
      validators:PasswordsMatchValidator('password',"confirmPassword"),
    }
    );

    this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted=true;

    if(this.registerForm.invalid) return;

    const fv= (this.registerForm.value);

    const user:IUserRegister ={
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    }

    this.userServices.register(user).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }


}
