import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, map, Observable} from "rxjs";
import {Todo} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private store: AngularFirestore,
  ) { }


  /**
   * Get list of items and map object to t.o.d.o interface
   */
  getTodoItems(): Observable<Todo[]> {
    return this.store.collection('/items').snapshotChanges()
      .pipe(
        map( data => {
          return data.map( d => {
            const {name, date, status} = d.payload.doc.data() as Todo;
            return {
              name,
              date,
              status,
              id: d.payload.doc.id,
            } as Todo
          })
        })
      )
  }


  addTodo( item : Todo ) {
    return from(this.store.collection('/items').add( item ));
  }


  delete( id : string | undefined ) {
    return from(this.store.doc('/items/' + id ).delete());
  }

  updateTodo( id: string| undefined, item: Partial<Todo>) {
    return from(this.store.doc('/items/' + id ).update(item));
  }
}
