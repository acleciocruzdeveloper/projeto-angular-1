import { Component, DoCheck } from '@angular/core';
import { first, last } from 'rxjs';

import { TaskList } from '../../models/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  setEmitTaskList(event: string) {

    this.taskList.push({
      task: event, checked: false
    });
  }

  deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  deleteAllTaskList() {
    const confirm = window.confirm("DESEJA APAGAR A LISTA DE TASK ?");
    if (confirm) {
      this.taskList = []
    }

  }

  validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("TASK ESTÁ VAZIA, DESEJA DELETAR ?");
      if(confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  setLocalStorage() {
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
