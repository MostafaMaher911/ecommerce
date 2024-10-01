import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient :HttpClient) { }

  // myheaders :any={token :localStorage.getItem('userToken')}

  checkOut(idcart:string|null , shippingDetails:object ):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idcart}?url=${environment.urlServer}`,
      {
        "shippingAddress":shippingDetails
    }
    
    )
  }


  getAllorders():Observable<any>
  {
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/cart`, 
      
      
    )
  }
}
