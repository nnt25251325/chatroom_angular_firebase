import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from './../../models/chat-message.model';
import { AuthService } from './../../services/auth.service';
import { ChatService } from './../../services/chat.service';
import { User } from './../../models/user.model';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

	@Input() chatMessage: ChatMessage;
	@Output('updateMessage') updateMessageConnector = new EventEmitter<any>();
	public isOwnMessage: boolean;
	public ownEmail: string;

	constructor(
		private authService: AuthService,
		private chatService: ChatService
	) { }

	ngOnInit() {
		this.authService.getCurrentUser.subscribe((user: User) => {
			if (user) {
				this.ownEmail = user.email;
				this.isOwnMessage = (this.ownEmail === this.chatMessage.email);
			}
		});
	}

	onDeleteMessage(key) {
		if (confirm('Are you sure you want to delete this message?')) {
			this.chatService.deteleMessage(key);
		}
	}

}
