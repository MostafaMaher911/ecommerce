import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService =inject(AuthService);
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _Router =inject(Router);

  msgError :string ='';
  isloading :boolean =false;
  msgSuccess :boolean =false;





  loginForm:FormGroup = this._FormBuilder.group({
    
    email: [null , [Validators.required ,Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    
  })



  loginsupmit():void 
  {
    if (this.loginForm.valid) {

      this.isloading=true;
      

        this._AuthService.setloginForm(this.loginForm.value).subscribe({
          next:(res)=>{;


            if(res.message == 'success')
            {
              this.msgSuccess=true;
              setTimeout(() => {

                localStorage.setItem('userToken',res.token)

                this._AuthService.saveUserData();


                this._Router.navigate(['/home'])
              }, 500);
            }



            this.isloading=false;
          },
          error:(err)=>{
            this.msgError = err.error.message
            console.log(err);
            this.isloading=false;
          },
        })

        





      
      
      


      
    }
    else
    {
      this.loginForm.markAllAsTouched()
    }
    
    
  }

}
