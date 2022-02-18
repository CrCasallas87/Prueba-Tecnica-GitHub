import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise ( resolve => {
      const getToken = localStorage.getItem('token');
      if ( getToken != null && getToken == '1234567'){
      
        resolve (true);
      }
      else
      {
        this.router.navigateByUrl('/');
        resolve (false);
      }    
    });
  }
}
