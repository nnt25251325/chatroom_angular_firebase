import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
	) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const currentUser = this.authService.getCurrentUserValue;

		if (!currentUser) return true;

		console.log('You are signed in!');
		this.router.navigate(['chat'])
		return false;
	}
}
