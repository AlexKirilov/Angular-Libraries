import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MessageHandlerComponent } from './message-handler/message-handler.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [MessageHandlerComponent],
  declarations: [MessageHandlerComponent],
  entryComponents: [MessageHandlerComponent]
})
export class MessageHandlerModule { }
