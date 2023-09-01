import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { Todo, Status } from 'src/app/models/todo.models';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  todo: Todo[] = [];
  doing: Todo[] = [];
  done: Todo[] = [];
  statusEnum = Status;


  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodosAndGroupByStatus();
  }

  getTodosAndGroupByStatus(): void {
    this.todoService.GetTodos()
      .subscribe(todos => {
        this.todo = todos.filter(todo => todo.status === Status.ToDo);
        this.doing = todos.filter(todo => todo.status === Status.Doing);
        this.done = todos.filter(todo => todo.status === Status.Done);
      });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const todo = event.previousContainer.data[event.previousIndex];
      const newStatus = this.getStatusFromContainer(event.container.id); // Use o ID do container
      if (todo.status !== newStatus) {
        todo.status = newStatus;
        this.todoService.updateTodo(todo)
          .subscribe(updatedTodo => {
            this.getTodosAndGroupByStatus();
          });
      }
    }
  } 


  private getStatusFromContainer(containerId: string): Status {
    if (containerId === 'todo-container') {
      return Status.ToDo;
    } else if (containerId === 'doing-container') {
      return Status.Doing;
    } else if (containerId === 'done-container') {
      return Status.Done;
    }
    return Status.ToDo; // Default to ToDo
  }

}
