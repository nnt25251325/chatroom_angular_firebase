import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ChatService } from './../../services/chat.service';
import { ChatMessage } from './../../models/chat-message.model';

@Component({
	selector: 'app-chat-form',
	templateUrl: './chat-form.component.html',
	styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit, OnChanges {

	public message: string = '';
	public isEditing: boolean = false;
	public chatMessage: ChatMessage;
	@Input() objMessage: any;

	constructor(
		private chatService: ChatService
	) { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.objMessage.currentValue) {
			console.log(changes.objMessage.currentValue);
			this.chatMessage = changes.objMessage.currentValue.messageData;
			this.message = this.chatMessage.message;
			this.isEditing = true;
		}
	}

	send(): any {
		if (!this.message.trim()) { return false };
		if (!this.chatMessage) {
			this.chatService.sendMessage(this.message);
		} else {
			this.chatService.updateMessage(this.chatMessage['key'], this.message);
			this.isEditing = false;
		}
		this.message = '';
	}

	handleSubmit(event: any): void {
		if (event.keyCode === 13) this.send();
	}

}
