import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _OrdersService =inject(OrdersService)

  ordersForm:FormGroup =new FormGroup({

    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null)

  })

  cartId:string|null = ''; 

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({

      next:(params)=>
        {
          this.cartId = params.get('id')
       
        },
        error:(err)=>
        {
          console.log(err);
          
  
        }
      
    })

  
  
  }


  orderSupmit():void
  {
    console.log(this.ordersForm.value);

    this._OrdersService.checkOut(this.cartId,this.ordersForm.value).subscribe({

      next:(res)=>
        {
          console.log(res);
          if (res.status === 'success') {
            
            window.open(res.session.url,'_self')
            
          }
          
          
          
            
        },
        error:(err)=>
        {
          console.log(err);
          
  
        }
    })
    

  }



  

}
