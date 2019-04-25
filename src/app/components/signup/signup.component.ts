import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

	public subscription: Subscription;
	public formSignUp: FormGroup;
	public email: string;
	public password: string;
	public displayName: string;
	public errorMsg: string;
	public isSubmitted: boolean = false;
	public isLoading: boolean = false;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.createForm();

		this.subscription = this.formSignUp.valueChanges.subscribe(data => {
			this.email = data.email;
			this.password = data.password;
			this.displayName = data.displayName;
		});
	}

	createForm(): void {
		this.formSignUp = this.formBuilder.group({
			email: ['', [
				Validators.required,
				Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{1,}[.]{1}[a-zA-Z]{2,}")
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(6)
			]],
			displayName: ['', Validators.required ]
		});
	}

	get f() {
		return this.formSignUp.controls;
	}

	onSignUp(): any {
		this.isSubmitted = true;

		if (this.formSignUp.invalid) return false;

		this.isLoading = true;

		this.authService.signup(this.email, this.password, this.displayName)
			.catch(error => {
				console.log(error);
				this.errorMsg = error.message;
				this.isLoading = false;
			});
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
