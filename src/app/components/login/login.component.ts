import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public formLogin: FormGroup;
	public email: string;
	public password: string;
	public errorMsg: string;
	public isSubmitted: boolean = false;
	public isLoading: boolean = false;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.createForm();

		this.formLogin.valueChanges.subscribe(data => {
			this.email = data.email;
			this.password = data.password;
		});

		// reset login status
		this.authService.logout();
	}

	createForm(): void {
		this.formLogin = this.formBuilder.group({
			email: ['', [
				Validators.required,
				Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}")
			]],
			password: ['']
		});
	}

	get f() {
		return this.formLogin.controls;
	}

	onLogin(): any {
		this.isSubmitted = true;

		if (this.formLogin.invalid) return false;

		this.isLoading = true;

		this.authService.login(this.email, this.password)
			.catch(error => {
				console.log(error);
				this.errorMsg = error.message;
				this.isLoading = false;
			});
	}

}
