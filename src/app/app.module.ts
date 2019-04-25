import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';

import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';

import { environment } from './../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LoginComponent,
		ChatroomComponent,
		HeaderComponent,
		NotFoundComponent,
		FeedComponent,
		MessageComponent,
		ChatFormComponent,
		UserListComponent,
		UserItemComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFireModule.initializeApp(environment.firebase),
		AppRoutingModule
	],
	providers: [
		ChatService,
		AuthService,
		AuthGuard,
		SecureInnerPagesGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
