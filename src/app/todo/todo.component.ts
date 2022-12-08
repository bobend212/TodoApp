import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: any[] = [];
  updateMode : boolean = false;
  newTitle: string = "";
  
  @Input() hideComponent: boolean = false;
  @Input() todoModel!: Todo;

  todo: Todo = {
    title: "",
    isDone: false,
    isEditing: false,
    dateCreated: Date.now(),
    dateEdited: 0,
    dateFinished: 0
  }

  constructor(private todoService: TodoService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todos = item.sort((a:any,b:any) => 
        {return a.isDone - b.isDone } );
      })
  }

  openTaskDetails(todoModel: Todo){
    this.hideComponent = true;
    this.todoModel = todoModel;
    }

  onCreate(titleInput: HTMLInputElement) {
    this.hideComponent = false;
    if (titleInput.value) {
      this.todo.title = titleInput.value;
      this.todoService.addTodo(this.todo);
      this._snackBar.open(`New task created!`, "OK", { duration: 2500 });
     titleInput.value = "";
    }
    console.log(this.todo.dateCreated);
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.hideComponent = false;
    let finishDate;
    if(newStatus == true) finishDate = Date.now();
    else finishDate = 0; 
    this.todoService.updateTodoStatus(id, newStatus, finishDate);
    this._snackBar.open(`Task updated!`, "OK", { duration: 2500 });
  }
  
  onDelete(id:string){
    this.hideComponent = false;
    this.todoService.deleteTodo(id);
    this._snackBar.open(`Task removed!`, "OK", { duration: 2500 });
  }

  onEditMode(i:any) {
    this.hideComponent = false;
    this.todos[i].isEditing = !this.todos[i].isEditing;
  }

  onUpdate(id:string, newTitle: string){
    this.hideComponent = false;
    if(newTitle != "") 
    {
      this.todoService.updateTodo(id, newTitle, Date.now()); 
      this.updateMode = !this.updateMode;
      this._snackBar.open(`Task updated!`, "OK", { duration: 2500 });
      this.newTitle = "";
    }
  }

  cancelEditMode(i:any) {
    this.todos[i].isEditing = !this.todos[i].isEditing;
  }
}
