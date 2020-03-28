import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { environment } from '../../environments/environment';

import { MensajeModel } from '../models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats: [];

  readonly token = environment.dialogflow.covidBot9;
  readonly client = new ApiAiClient({accessToken: this.token});

  conversation = new BehaviorSubject<MensajeModel[]>([]);

  constructor() {}

  public talk() {
    this.client.textRequest('Hola')
        .then(resp => console.log(resp));
  }

  // Adds Message to source
  public update(msg: MensajeModel) {
    this.conversation.next([msg]);
  }

  // Sends and recieves messages via Dialogflow
  public converse(msg: string) {
    let userMessage: MensajeModel;

    userMessage = {
      sendBy: 'User',
      message: msg,
      date: new Date()
    };

    this.update(userMessage);

    return this.client.textRequest(msg).then((resp) => {
      const speech = resp.result.fulfillment.speech;
      const timestamp = resp.timestamp;

      let botMessage: MensajeModel;

      botMessage = {
        sendBy: 'CovidBot-19',
        message: speech,
        date: timestamp
      };

      this.update(botMessage);
    });
}
}


