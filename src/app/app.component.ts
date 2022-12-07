import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoApp';
  valFromChild = false;

  childToParent($event: boolean){
    this.valFromChild = $event;
    console.log($event);
    }
}
