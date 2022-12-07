import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: any[] = [];
  updateMode : boolean = false;
  newTitle: string = "";

  constructor(private todoService: TodoService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges({ idField: 'id' })
      .subscribe(item => {
        this.todos = item.sort((a:any,b:any) => 
        {return a.isDone - b.isDone } );
      })
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      this._snackBar.open(`New task created!`, "OK", { duration: 2500 });
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
    this._snackBar.open(`Task updated!`, "OK", { duration: 2500 });
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
    this._snackBar.open(`Task removed!`, "OK", { duration: 2500 });
  }

  onEditMode(i:any) {
    this.todos[i].isEditing = !this.todos[i].isEditing;
  }

  onUpdate(id:string, newTitle: string){
    if(newTitle != "") 
    {
      this.todoService.updateTodo(id, newTitle); 
      this.updateMode = !this.updateMode;
      this._snackBar.open(`Task updated!`, "OK", { duration: 2500 });
      this.newTitle = "";
    }
  }

  cancelEditMode(i:any) {
    this.todos[i].isEditing = !this.todos[i].isEditing;
  }
}
