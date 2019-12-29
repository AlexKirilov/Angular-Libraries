import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs/internal/observable/of';

import { inputListI } from 'projects/message-handler/src/lib/message-handler-interfaces';

import { MessageHandlerService } from 'projects/message-handler/src/public-api';
import { DatastoreService } from '../../services/datastore.service';


@Component({
  selector: 'app-msg-handler',
  templateUrl: './msg-handler.component.html',
  styleUrls: ['./msg-handler.component.scss']
})
export class MsgHandlerComponent {

  private btnTextSource = new BehaviorSubject<string>('');
  btnText = this.btnTextSource.asObservable();

  updateSource(txt: string): void {
    this.btnTextSource.next(txt);
  }

  constructor(
    private service: MessageHandlerService,
    private datastore: DatastoreService
  ) {
    this.datastore.pageIs = of('handler');
  }

  callDialog(type: string) {
    switch (type) {
      case 'info': this.triggerInfo(); break;
      case 'input': this.triggerInput(); break;
      case 'error': this.triggerError(); break;
      case 'debug': this.triggerDebug(); break;
      case 'logout': this.triggerLogout(); break;
      case 'status': this.triggerStatus(); break;
      case 'prompt': this.triggerPrompt(); break;
      case 'warning': this.triggerWarning(); break;
      case 'requestErr': this.triggerReqError(); break;
    }
  }

  triggerReqError() {
    let errorStatNum = [401, 402, 403, 404, 408, 409, 0, 500, 503, 5, 8];
    let err: any | HttpErrorResponse = {}// HttpErrorResponse = new Object() as HttpErrorResponse;
    err.status = errorStatNum[Math.floor(Math.random() * errorStatNum.length)];
    err.type = 'error';
    err.message = err.ErrorMessage = `Triggering Request with error status ${err.status}`;
    this.service.handleError(err, log => this.updateSource(`401 was triggered - THE USER SHOULD LOGOUT NOW!!!`));
  }

  triggerLogout() {
    let err: any | HttpErrorResponse = {}// HttpErrorResponse = new Object() as HttpErrorResponse;
    err.status = 401;
    err.type = 'error';
    this.service.handleError(err, log => this.updateSource(`Request return with Status 401. Session has been expired! User is logged out`));
  }

  triggerInput() {
    this.service.openDialogInputs(
      {
        msg: 'Enter the model`s name, before continue',
        data: modelsNamePromptFields
      },
      (res: any) => res ? this.updateSource(`Input response is: placeholder: "${res[0].placeholder}", FieldType: "${res[0].type}", Value: "${res[0].value}" !`) : null);
  }

  triggerPrompt() {
    this.service.openDialogPrompt({
      Title: 'Some title',
      Type: 'prompt',
      ErrorMessage: `Delete Scenario?`,
    }, (bool: boolean) => this.updateSource(`Prompt response is ${bool}`));
  }

  triggerInfo() {
    this.service.openDialog({
      ErrorMessage: 'Info message was triggered',
      msgType: 'info',
    });
  }

  triggerDebug() {
    this.service.openDialog({
      ErrorMessage: 'Debugging message was triggered',
      msgType: 'debug',
    });
  }

  triggerStatus() {
    this.service.openDialog({
      ErrorMessage: 'Status message was triggered',
      msgType: 'status',
    });
  }

  triggerError() {
    this.service.openDialog({
      ErrorMessage: 'An error occurred while trying to load data for that model.',
      msgType: 'error',
    });
  }

  triggerWarning() {
    this.service.openDialog({
      ErrorMessage: 'Warning message was triggered',
      msgType: 'warning',
    });
  }

  tri() {
    this.service.openDialogInputs
  }
}

const modelsNamePromptFields: Array<inputListI> = [
  { field: 'modelName', type: 'text', value: '', placeholder: 'Model name' },
  { field: 'someName1', type: 'date', value: '', placeholder: 'date' },
  { field: 'someName2', type: 'color', value: '', placeholder: 'color' },
  { field: 'someName3', type: 'datetime-local', value: '', placeholder: 'datetime-local' },
  { field: 'someName4', type: 'email', value: '', placeholder: 'email' },
  { field: 'someName5', type: 'month', value: '', placeholder: 'month' },
  { field: 'someName6', type: 'number', value: '', placeholder: 'number' },
  { field: 'someName7', type: 'password', value: '', placeholder: 'password' },
  { field: 'someName8', type: 'search', value: '', placeholder: 'search' },
  { field: 'someName9', type: 'tel', value: '', placeholder: 'tel' },
  { field: 'someName10', type: 'time', value: '', placeholder: 'time' },
  { field: 'someName11', type: 'url', value: '', placeholder: 'url' },
  { field: 'someName12', type: 'week', value: '', placeholder: 'week' },
];