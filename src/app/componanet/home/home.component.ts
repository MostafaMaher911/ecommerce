import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , FormsModule , RouterLink ,UpperCasePipe,SearchPipe,LowerCasePipe,TitleCasePipe,SlicePipe ,CurrencyPipe,DatePipe,JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {


  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  

  productList:IProduct [] = [];
  categoriesList:Icategories [] = [];

  text:string='';

  getAllProductsSup !:Subscription;





  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay :true,
    autoplayTimeout: 2000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left" style="color: #63E6BE;"></i>', '<i class="fa-solid fa-arrow-right" style="color: #63E6BE;"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  
  customOptionsmain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay :true,
    autoplayTimeout: 6000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    items:1,
    nav: true
  }




  ngOnInit(): void {

    



   this.getAllProductsSup = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>
      {
          
          this.productList = res.data;
          
          
          
          
      }
    })



    this._CategoriesService.getAllCategories().subscribe({


      next:(res)=>
        {
            
         
         this.categoriesList = res.data
         
            
        }


    })

    

  }

  addToCart(id:string):void
  {
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>
        {
        
            this._ToastrService.success(res.message, 'FreshCart')
            this._CartService.cartnum.next(res.numOfCartItems)
            
            
            
            
            
        }
    })
  }


  ngOnDestroy(): void {

    this.getAllProductsSup?.unsubscribe()


    
  }



  



}
