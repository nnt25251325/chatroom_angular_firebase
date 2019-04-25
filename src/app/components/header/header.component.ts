import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public currentUser: User;

	constructor(
		private authService: AuthService
	) {
		this.authService.getCurrentUser.subscribe((user: User) => {
			this.currentUser = user;
		});
	}

	ngOnInit() {
	}

	logout(): void {
		this.authService.logout();
	}

}
