import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  private readonly  _HttpClient =inject(HttpClient)

   

   cartnum :BehaviorSubject<number> =new BehaviorSubject(0)




  addProductToCart(Id:string):Observable<any>
  {
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/cart`, 
      {
        "productId": Id

      } 
    )
  }

  getProductCart():Observable<any>
  {
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/cart`
    )
  }


  RemoveSpecificCart(id:string):Observable<any>
  {
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart/${id}`
    )
  }

  updateCartProduCtquantity(id:string , newcount:number):Observable<any>
  {
    return this._HttpClient.put( `${environment.baseUrl}/api/v1/cart/${id}`, 
      
      {
        "count":newcount,
       
      }
      
    )
  }

  clearUserCart(id:string ):Observable<any>
  {
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart`
    )
  }



 
}
