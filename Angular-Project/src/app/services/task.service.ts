import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  apiURL = "http://localhost:3000/tasks"
  findAll() {
    return this.http.get<Task[]>(this.apiURL)
  }

  delete(id: any) {
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  persist(task: Task) {
    return this.http.post<Task>(this.apiURL, task);
  }

  completed(id: any, completed: boolean){
    return this.http.patch(`${this.apiURL}/${id}`, {completed: !completed})
  }

  update(task: Task) {
    return this.http.put(`${this.apiURL}/${task.id}`, task)
  }
}
