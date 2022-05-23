import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TranslateConfigService {
  constructor( private translateService: TranslateService) {
    this.translateService.use('en');
  }

  changeLanguage(type: string) {
    this.translateService.use(type);
  }

  translate( input: string ): Observable<any> {
    return  this.translateService.get( input);
  }
}
