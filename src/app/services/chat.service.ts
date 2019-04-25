import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from './../models/chat-message.model';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	public user: firebase.User;
	public chatMessagesRef: AngularFireList<any>;
	public userName: Observable<string>;

	constructor(
		private db: AngularFireDatabase,
		private afAuth: AngularFireAuth
	) {
		this.afAuth.authState.subscribe((user: firebase.User) => {
			if (user) {
				this.user = user;
			}
			this.getUser().snapshotChanges().subscribe(data => {
				console.log('CURRENT USER: ' + JSON.stringify(data.payload.val()));
				let user = data.payload.val();
				this.userName = user['displayName'];
			});;
		});
	}

	getUser(): AngularFireObject<any> {
		console.log('CALL: getUser()');
		const userId = this.user.uid;
		const path = `/users/${userId}`;
		return this.db.object(path);
	}

	getUsers(): AngularFireList<any> {
		console.log('CALL: getUsers()');
		return this.db.list('/users');
	}

	getMessages(): AngularFireList<any> {
		console.log('CALL: getMessages()');
		this.chatMessagesRef = this.db.list('messages', ref => ref.orderByKey().limitToLast(100));
		return this.chatMessagesRef;
	}

	sendMessage(msg: string): void {
		console.log('CALL: sendMessage()');
		this.chatMessagesRef.push({
			email: this.user.email,
			userName: this.userName,
			message: msg,
			timeSent: this.getTimeStamp()
		});
	}

	deteleMessage(key: string): void {
		console.log('CALL: deteleMessage()');
		this.chatMessagesRef.remove(key);
	}

	updateMessage(key: string, message: string): void {
		console.log('CALL: updateMessage()');
		this.chatMessagesRef.update(key, { message });
	}

	getTimeStamp(): string {
		const now = new Date();
		const date = now.getFullYear() + '/' +
									(now.getMonth() + 1) + '/' +
									now.getDate();
		const time = now.getHours() + ':' +
									now.getMinutes() + ':' +
									now.getSeconds();
		return (date + ' ' + time);
	}

}
