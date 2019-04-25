import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private currentUserSubject: BehaviorSubject<User>;
	private currentUser: Observable<User>;

	constructor(
		private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private router: Router
	) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	get getCurrentUserValue(): User {
		return this.currentUserSubject.value;
	}

	get getCurrentUser(): Observable<User> {
		return this.currentUser;
	}

	signup(email: string, password: string, displayName: string) {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then(res => {
				if (res.user) {
					console.log('SIGNUP SUCCESS: ' + res.user.email);
					localStorage.setItem('currentUser', JSON.stringify(res.user));
					this.currentUserSubject.next(res.user);
					this.setUserData(res.user.uid, email, displayName, 'online');
					this.router.navigate(['chat']);
				}
			});
	}

	login(email: string, password: string): Promise<void> {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then(res => {
				if (res.user) {
					console.log('LOGIN SUCCESS: ' + res.user.email);
					localStorage.setItem('currentUser', JSON.stringify(res.user));
					this.currentUserSubject.next(res.user);
					this.updateUserStatus(res.user.uid, 'online');
					this.router.navigate(['chat']);
				}
			});
	}

	logout(): void {
		this.afAuth.auth.signOut();
		this.currentUserSubject.value ? this.updateUserStatus(this.currentUserSubject.value.uid, 'offline') : '';
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
		this.router.navigate(['login']);
	}

	setUserData(id: string, email: string, displayName: string, status: string): void {
		const path = `users/${id}`;
		const data = {
			email: email,
			displayName: displayName,
			status: status
		}

		this.db.object(path).update(data)
			.catch(error => console.log(error));
	}

	updateUserStatus(id: string, status: string): void {
		const path = `users/${id}`;
		const data = {
			status: status
		}

		this.db.object(path).update(data)
			.catch(error => console.log(error));
	}

}
