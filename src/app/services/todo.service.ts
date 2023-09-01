import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Status, Todo } from '../models/todo.models';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = "http://localhost:3000/todos";

  constructor(private http: HttpClient) { }

  GetTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl)
  }

  GetTodosById(id: number): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Todo>(url);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  updateTodoStatus(todo: Todo, newStatus: Status): Observable<Todo> {
    const updatedTodo: Todo = { ...todo, status: newStatus }; // Cria um novo objeto com o novo status
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }

  deleteTodo(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}