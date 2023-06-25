import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
@Injectable({
  providedIn: 'root'
})
export class PasajeroGuard implements CanActivate {
  constructor(private navController: NavController) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('rolUsuario') === 'Pasajero' ){
        
        return true;
      }
      else{
        this.navController.navigateRoot('/solicitar-vehiculo');
        return false;
      }
  }
  
}
