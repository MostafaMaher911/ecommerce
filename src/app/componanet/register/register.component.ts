import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService =inject(AuthService);
  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _Router =inject(Router);

  msgError :string ='';
  isloading :boolean =false;
  msgSuccess :boolean =false;





  registerForm:FormGroup = this._FormBuilder.group({
    name: [null , [Validators.required , Validators.minLength(3),Validators.maxLength(20)]],
    email: [null , [Validators.required ,Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    phone: [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators:[this.confirmPassword]})















  // registerForm:FormGroup =new FormGroup( {
    
  //   name: new FormControl(null , [Validators.required , Validators.minLength(3),Validators.maxLength(20)  ] ),
    
  //   email: new FormControl(null, [Validators.required ,Validators.email]),
    
  //   password: new FormControl(null, [Validators.required , Validators.pattern(/^\w{6,}$/)] ),
    
  //   rePassword: new FormControl(null, [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    
  //   phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    
  // }, this.confirmPassword );


  

  confirmPassword(g:AbstractControl)
  {
    if (g.get('password')?.value===g.get('rePassword')?.value) 
      {
        return null;
      
    }
    else
    {
      return {mismatch:true}
    }

  }


  registerSup !: Subscription


  registersupmit():void 
  {
    if (this.registerForm.valid) {

      this.isloading=true;

      
      

      this.registerSup = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
          next:(res)=>{


            if(res.message == 'success')
            {
              this.msgSuccess=true;
              setTimeout(() => {
                this._Router.navigate(['/login'])
              }, 1000);
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
      this.registerForm.markAllAsTouched()
    }
    
    
  }



  ngOnDestroy(): void {
    this.registerSup?.unsubscribe()
    
  }

}
