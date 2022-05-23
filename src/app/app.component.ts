import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ConfirmationService, MessageService} from "primeng/api";
import {Todo} from "./shared/todo.model";
import {TodosService} from "./shared/todos.service";
import {TranslateConfigService} from "./shared/translate-config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AngularFireDatabase
  ]
})
export class AppComponent {
  showAddModal = false;
  showLoader = false;
  items: Todo[] = [];

  cities = [
    {name: 'English', code: 'en'},
    {name: 'Spanish', code: 'sp'},
  ];

  selectedCity = {name: 'English', code: 'en'};

  fc_name = new FormControl(null, Validators.required);
  fc_date = new FormControl(new Date('2022-05-23T19:00:00.000Z'), Validators.required);

  addForm = new FormGroup({
    name: this.fc_name,
    date: this.fc_date,
  })

  constructor(
    private todoSvc: TodosService,
    private toastSv: MessageService,
    private confirmationService: ConfirmationService,
    private translateConfigService: TranslateConfigService,
  ) {


    this.showLoader = true;
    this.todoSvc.getTodoItems().subscribe({
      next: value => {
        this.items = value;
        this.showLoader = false;
      }
    })
  }


  /**
   * Create todo item
   */
  async addTodos() {

    this.showLoader = true;
    this.addForm.disable();

    const added = await this.translateConfigService.translate('todo.created').toPromise();

    // Create todo
    this.todoSvc.addTodo({
      name: this.addForm.value?.name,
      date: (this.addForm.value?.date as Date).toISOString(),
      status: false,
    }).subscribe({
      next: val => {
        this.toastSv.add({severity: 'success', summary: added});
        this.showAddModal = false;
        this.showLoader = false;
        this.addForm.enable();
        this.addForm.reset();
      }
    })
  }

  /**
   * Delete from firestore
   * @param event
   * @param id
   */
  async deleteItem(event: Event, id: string | undefined) {
    const areYouSure = await this.translateConfigService.translate('confirm-proceed').toPromise();
    const deleted = await this.translateConfigService.translate('todo.deleted').toPromise();
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: areYouSure,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showLoader = true;
        this.todoSvc.delete(id).subscribe({
          next: v => {
            this.toastSv.add({
              severity: 'info',
              summary: deleted,
            })
          }
        })
        this.showLoader = false;
      }
    });
  }

  /**
   * Set item as done
   * @param id
   */
  async setAsDone(id: string | undefined) {
    const updated = await this.translateConfigService.translate('todo.updated').toPromise();
    this.todoSvc.updateTodo(id, {
      status: true,
    }).subscribe({
      next: () => {
        this.toastSv.add({
          severity: 'info',
          summary: updated,
        })
      }
    })
  }

  /**
   * Show Add modal
   * @param value
   */
  showModal(value: string) {
    this.fc_name.setValue( value );
    this.showAddModal = true;
  }

  /**
   * Lang change handler
   */
  onLangChang() {
    setTimeout(() => {
      console.log(this.selectedCity.code);
      this.translateConfigService.changeLanguage(this.selectedCity.code);
    })
  }
}
