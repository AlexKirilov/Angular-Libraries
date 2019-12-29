import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http/http';

import { Unsubscribable } from 'rxjs/internal/types';

import { openDialog, openDialogPrompt, openDialogInputs } from './message-handler-interfaces';
import { MessageHandlerComponent } from './message-handler/message-handler.component';

const modalWidth = '600px';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  private isOpen: boolean = false;
  private unsubscribeDialogRef: Unsubscribable;

  constructor(
    public dialog: MatDialog
  ) { }

  /**
  *  Handles all normal and Error messages thet need to be displayed on the screen
  *  @param error: openDialog | Error | HttpErrorResponse | any - income data
  *  @param callback - return data or on Dialog Panel close response
  *  @param errorCallback - return errors that may acquire in the process
  *  @param width - set the Dialog size, by default is set to 600px
  */
  openDialog(error: openDialog | Error | HttpErrorResponse | any, callback?: (data: any) => void, errorCallback?: (err: any) => void, width?: string): void {
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: width || modalWidth,
      data: {
        title: ((error && (error.Title || error.title)) ? error.Title || error.title || error.statusText : error.Type || error.type || error.msgType),
        message: error.ErrorMessage || error.message || error.error,
        msgType: error.Type || error.type || error.msgType || 'error',
        source: error.ErrorSource || 'error',
        time: error.ErrorDateTime || new Date(),
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().subscribe(
      result => {
        this.isOpen = false;
        (!!callback) ? callback(result) : null
      },
      err => errorCallback(err)
    );
  }

  /**
  *  Handles all Prompt messages tha needs to be displayed
  *  @param error: openDialogPrompt - income data
  *  @param callback - return data the user response and close the Dialog panel
  *  @param errorCallback - return errors that may acquire in the process
  *  @param width - set the Dialog size, by default is set to 600px
  */
  openDialogPrompt(error: openDialogPrompt, callback: (response: any) => void, errorCallback?: (err: any) => void, width?: string): void {
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: width || modalWidth,
      data: {
        title: (error && error.Title) ? error.Title : 'prompt',
        message: error.ErrorMessage,
        msgType: 'prompt', // error.Type,
        source: error.ErrorSource || '',
        time: error.ErrorDateTime || new Date,
        elements: error.Elements || null,
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().subscribe(
      result => (result === void 0) ? callback(false) : callback(result),
      err => errorCallback(err)
    );
  }

  /**
  *  Handles all Prompt messages tha needs to be displayed
  *  @param error: openDialogPrompt - income data
  *  @param callback - return data the user response and close the Dialog panel
  *  @param errorCallback - return errors that may acquire in the process
  *  @param width - set the Dialog size, by default is set to 600px
  */
  openDialogInputs(data: openDialogInputs, callback: (data: any) => void, errorCallback?: (err: any) => void, width?: string): void {
    const dialogRef = this.dialog.open(MessageHandlerComponent, {
      width: width || modalWidth,
      data: {
        title: '',
        message: data.msg,
        msgType: 'import',
        source: '',
        time: '',
        elements: data.data || null,
        elementsList: new FormControl()
      }
    });

    this.unsubscribeDialogRef = dialogRef.afterClosed().subscribe(
      result => (result === void 0) ? callback(false) : callback(result),
      err => errorCallback(err)
    );
  }

  /**
  *  Handles all income errors
  *  @param err: Income error with type HttpErrorResponse
  *  @param logout - is a callback function returns data on event of (401 || 403) or User session has been expired
  */
  handleError(err: HttpErrorResponse, logout: (err: any) => void): void | any {
    if (!this.isOpen) {
      this.isOpen = true;
      let error: HttpErrorResponse | any = err;
      if (error && error.error && error.error.hasOwnProperty('sortColumn')) {
        this.openDialog(this.errorPrototype('error', errorSortColumn));
        return 1;
      } else if (err.statusText === 'Unknown Error') {
        this.openDialog(this.errorPrototype('error', errorUnknownError));
        return 1;
      } else if (err.statusText === 'Service Unavailable') {
        this.openDialog(this.errorPrototype('error', errorNoService));
        return 1;
      }

      switch (err.status) {
        case 401 || 403:  // Session has been expired
          this.isOpen = false;
          logout(true);
          break;
        case 404:
          this.openDialog(err);
          break;
        case 400 || 408: // Default message only for unexpected /Unknown errors
          this.openDialog(this.errorPrototype(err.statusText, err.message));
          break;
        case 409:  // For conflicts
          this.openDialog(err);
          break;
        case 0: // For unexpected / Unknown errors
          this.openDialog(this.errorPrototype('error', error0));
          break;
        case 500 || 503:
          this.openDialog(this.errorPrototype('error', error500503));
          break;
        default:
          this.openDialog(error);
          break;
      }
    }
  }

  errorPrototype(Title: string, ErrorMessage: string, Type: 'error' = 'error') {
    return {
      Title,
      Type,
      ErrorMessage
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeDialogRef.unsubscribe();
  }

}

const error0 = `
Sorry! We could not load your data. 
There was an Internal Server Error! 
Please contact with your administrator or try again later.`;

const error500503 = `
We are sorry, but this service is unavailable for the moment!
Please contact with your administrator or try again later.`;

const errorNoService = `
We are sorry, but this service is unavailable for the moment!
Please contact with your administrator or try again later.`;

const errorSortColumn = `Table can't be sorted by this column`;

const errorUnknownError = `
 Sorry! We could not load your data.
 There was an Internal Server Error!
 Please contact with your administrator or try again later`;
