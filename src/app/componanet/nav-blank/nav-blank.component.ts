import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
   readonly _AuthService = inject(AuthService)
   readonly _CartService = inject(CartService)


   cartItemsCounter:number = 0;
   
   ngOnInit(): void {


    this._CartService.getProductCart().subscribe({
      next:(res)=>
        {
          this._CartService.cartnum.next(res.numOfCartItems)

        }

    })

    this._CartService.cartnum.subscribe({
       next:(data)=>
        {this.cartItemsCounter=data
          
        },
       error:(err)=>
        {
          console.log(err);
          

        }
    })
    
   }


  
    
    



   


  



}
