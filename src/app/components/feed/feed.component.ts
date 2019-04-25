import { Component,
				 OnInit,
				 OnChanges,
				 AfterViewChecked,
				 ViewChild,
				 ElementRef,
				 Output,
				 EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from './../../models/chat-message.model';
import { ChatService } from './../../services/chat.service';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges, AfterViewChecked {

	@ViewChild('scroller') private feedContainer: ElementRef;
	@Output('updateMessage') updateMessageConnector = new EventEmitter<any>();
	public feed: Observable<any[]>;

	constructor(
		private chatService: ChatService
	) { }

	ngOnInit() {
		this.getFeed();
	}

	ngOnChanges() {
		this.getFeed();
	}

	getFeed(): void {
		// this.feed = this.chatService.getMessages().valueChanges().subscribe(data => {
		// 	console.log(data);
		// });
		this.feed = this.chatService.getMessages().snapshotChanges().pipe(
			map(changes => {
				// console.log(changes);
				return changes.map(c => {
					// console.log(c.payload.val());
					return {
						key: c.payload.key,
						...c.payload.val()
					}
				})
			})
		);
	}

	scrollToBottom(): void {
		this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
	}

	onUpdateMessage(message) {
		let objMessage = {
			messageData: message,
			ranNumber: Math.random()
		}
		this.updateMessageConnector.emit(objMessage);
	}

	ngAfterViewChecked() {
		this.scrollToBottom();
	}

}
