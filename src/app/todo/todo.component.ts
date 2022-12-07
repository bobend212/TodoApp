import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: any[] = [];
  updateMode : boolean = false;
  newTitle: string = "";

  constructor(private todoService: TodoService) { }

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
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }

  onEditMode(i:any) {
    this.todos[i].isEditing = !this.todos[i].isEditing;
  }

  onUpdate(id:string, newTitle: string){
    if(newTitle != "") this.todoService.updateTodo(id, newTitle); 
    this.updateMode = !this.updateMode;
    this.newTitle = "";
  }

  cancelEditMode(i:any) {
    this.todos[i].isEditing = !this.todos[i].isEditing;
  }
}
