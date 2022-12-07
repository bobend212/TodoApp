import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  firestoreCollection : AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos');
   }

   addTodo(title: string){
     this.firestoreCollection.add({
       title,
       isDone: false,
       isEditing: false,
       dateCreated: Date.now(),
       dateEdited: null,
       dateFinished: null
     })
   }

   updateTodoStatus(id:string, newStatus:boolean){
     this.firestoreCollection.doc(id).update({isDone:newStatus});
   }

   deleteTodo(id:string){
     this.firestoreCollection.doc(id).delete();
   }

   updateTodo(id: string, newTitle: string) {
    this.firestoreCollection.doc(id).update({title:newTitle});
   }
}
