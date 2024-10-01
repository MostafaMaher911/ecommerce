import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {

  private readonly _OrdersService=inject(OrdersService)


  ngOnInit(): void {

    console.log(this._OrdersService.getAllorders);
    
    
  }

}
