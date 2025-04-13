import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule} from "@angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { ProductosComponent } from "./pages/productos/productos.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { CarritoComponent } from "./pages/carrito/carrito.component";
import { ContacComponent } from "./pages/contac/contac.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AdminGuard } from "./admin.guard"; // Asegúrate de importar correctamente tu guardia de administración


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'contac', component: ContacComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] }, // Protege esta ruta con el guard
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }