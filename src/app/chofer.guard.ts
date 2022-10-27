import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ChoferGuard implements CanActivate {

  constructor(private navController: NavController) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('rolUsuario') === 'chofer'){
        return true;
      }
      else{
        this.navController.navigateRoot('/registro-vehiculo');
        return false;
      }
  }
  
}
