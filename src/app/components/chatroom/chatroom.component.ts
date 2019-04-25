import { Component, OnInit } from '@angular/core';
import { ChatMessage } from './../../models/chat-message.model';

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

	public objMessage: any;

	constructor() { }

	ngOnInit() { }

}
