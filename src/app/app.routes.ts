import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './componanet/notfound/notfound.component';
import { LoginComponent } from './componanet/login/login.component';
import { RegisterComponent } from './componanet/register/register.component';
import { HomeComponent } from './componanet/home/home.component';
import { CategoriesComponent } from './componanet/categories/categories.component';
import { ProductComponent } from './componanet/product/product.component';
import { CartComponent } from './componanet/cart/cart.component';
import { BrandsComponent } from './componanet/brands/brands.component';
import { authGuard } from './core/Guards/auth.guard';
import { logedGuard } from './core/Guards/loged.guard';
import { DetailsComponent } from './componanet/details/details.component';
import { ForgetpasswordComponent } from './componanet/forgetpassword/forgetpassword.component';
import { AllOrdersComponent } from './componanet/all-orders/all-orders.component';
import { OrdersComponent } from './componanet/orders/orders.component';

export const routes: Routes = [
    {path:'' , component:AuthLayoutComponent ,canActivate:[logedGuard] , children:
        
        [
            {path:'' ,redirectTo:'login' , pathMatch:'full'},
            {path:'login' , component:LoginComponent},
            {path:'register' , component:RegisterComponent},
            {path:'forgot' , component:ForgetpasswordComponent}

        ]
    },

    {path:'' , component:BlankLayoutComponent ,canActivate:[authGuard] , children:
        [
            
            {path:'' ,redirectTo:'home' , pathMatch:'full'},
            {path:'home' , component:HomeComponent },
            {path:'categories' , component:CategoriesComponent},
            {path:'products' , component:ProductComponent},
            {path:'cart' , component:CartComponent},
            {path:'brands' , component:BrandsComponent},
            {path:'details/:id' , component:DetailsComponent},
            {path:'allorders' , component:AllOrdersComponent},
            {path:'orders/:id' , component:OrdersComponent},
            


        ]
    },

    {path:'**' , component:NotfoundComponent}
    



];
