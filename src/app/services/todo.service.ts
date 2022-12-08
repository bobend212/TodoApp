import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  firestoreCollection : AngularFirestoreCollection<Todo>;
  todoDoc!: AngularFirestoreDocument<Todo>;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos');
   }

   addTodo(todo: Todo){
     this.firestoreCollection.add(todo);
   }

   updateTodoStatus(id:string, newStatus:boolean, dateFinished: number){
     this.firestoreCollection.doc(id).update({isDone:newStatus, dateFinished:dateFinished});
   }

   deleteTodo(id:string){
     this.firestoreCollection.doc(id).delete();
   }

   updateTodo(id: string, newTitle: string, dateEdited: number) {
    this.firestoreCollection.doc(id).update({title:newTitle, dateEdited:dateEdited});
   }
}
