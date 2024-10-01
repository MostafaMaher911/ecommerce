import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { register } from 'module';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {


  step :Number = 1;
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


  


  verifyEmail : FormGroup =new FormGroup({

    email :new FormControl(null,[Validators.required ,Validators.email])

  })

  verifyCode : FormGroup =new FormGroup({

    restCode :new FormControl(null,[Validators.required ,Validators.pattern(/^[0-9]{6}$/)])

  })

  restPassword : FormGroup =new FormGroup({

    email :new FormControl(null,[Validators.required ,Validators.email]),

    newPassword:new FormControl(null,[Validators.required , Validators.pattern(/^\w{6,}$/)]), 
    
    


  })




  verifyEmailSubmit():void
  { this._AuthService.setEmailVarify(this.verifyEmail.value).subscribe({

    next:(res)=>
      {
          
        
        if (res.statusMsg ==='success') {
          this.step =2;
          
        }
          
          
          
      },
      error:(err)=>
      {
        console.log(err);
        

      }

  })

  }


  verifyCodeSubmit():void
  { this._AuthService.setCodeVarify(this.verifyCode.value).subscribe({

    next:(res)=>
      {
          
        
        if (res.status === 'Success') {
          this.step =3;
          
        }
          
          
          
      },
      error:(err)=>
      {
        console.log(err);
        

      }

  })

  }


  resetPassWordSubmit():void
  { this._AuthService.setResetPassword(this.restPassword.value).subscribe({

    next:(res)=>
      {
          
        
        localStorage.setItem('usertoken', res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
        
          
          
          
      },
      error:(err)=>
      {
        console.log(err);
        

      }

  })

  }




}
