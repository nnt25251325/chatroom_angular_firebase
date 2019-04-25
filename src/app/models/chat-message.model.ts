export class ChatMessage {
	public $key?: string;
	public email?: string;
	public userName?: string;
	public message?: string;
	public timeSent?: Date = new Date();
}
