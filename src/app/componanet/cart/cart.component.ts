import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart, ProductElement } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent   implements OnInit {
  private readonly _CartService =inject(CartService)


  cartdetails:Icart = {}  as Icart;
  
  // counter:ProductElement = {}  as ProductElement;
  

  


  ngOnInit():void
  {

    this._CartService.getProductCart().subscribe({
      next:(res)=>
        {
            
            
            console.log(res.data);
            
            
            this.cartdetails= res.data


            
              
              
            
            
            
        },
        error:(err)=>
        {
          console.log(err);
          
  
        }
    })
 

  }

  updataCount(id:string , count:number):void
  {
    if (count > 0) {
      this._CartService.updateCartProduCtquantity(id,count).subscribe({
        next:(res)=>
          {
              
              
              this.cartdetails = res.data
              
              
              
              
              
          },
          error:(err)=>
          {
            console.log(err);
            
    
          }
      })
  
      
    }
    else
    {
      this.removeItem(id)
    }
  }


  removeItem(id:string):void
  {
    this._CartService.RemoveSpecificCart(id).subscribe({
      next:(res)=>
        {
            
            
            this.cartdetails = res.data
            this._CartService.cartnum.next(res.numOfCartItems)
            
            
            
            
            
        },
        error:(err)=>
        {
          console.log(err);
          
  
        }
    })
  }



  clearCart(id:string):void
  {
    this._CartService.clearUserCart(id).subscribe({
      next:(res)=>
        {
            
            if (res.message == 'success') {
              this.cartdetails = {} as Icart;
              this.cartdetails.totalCartPrice = 0;
              this._CartService.cartnum.next(0)
              
            }
            
            
            
            
            
            
        },
        error:(err)=>
        {
          console.log(err);
          
  
        }
    })

  }



 
}
