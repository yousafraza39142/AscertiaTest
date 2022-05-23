import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {RippleModule} from "primeng/ripple";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {TagModule} from "primeng/tag";
import {DropdownModule} from "primeng/dropdown";



const NgPrimeModules = [
  InputTextModule,
  ToolbarModule,
  ButtonModule,
  DividerModule,
  DialogModule,
  CalendarModule,
  ToastModule,
  MessageModule,
  RippleModule,
  ConfirmPopupModule,
  TagModule,
  DropdownModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...NgPrimeModules,
    CommonModule
  ],
  exports: [
    ...NgPrimeModules
  ]
})
export class SharedModule { }
