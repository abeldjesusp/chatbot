import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { MensajeModel } from '../../models/mensaje.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public messages: Observable<MensajeModel[]>;
  public formValue: string;

  constructor(public chat: ChatService) { }

  ngOnInit() {
    // Appends to array after each new message is  added to feedSource
    this.messages = this.chat.conversation.asObservable()
                        .pipe(
                          scan((acc, val) => acc.concat(val))
                        );
  }

  public sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
