import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  tasks: Task[] = [];
  resultTasks: Task[] = [];

  editForm = false;
  showForm = false;
  searchText = "";
  myTask: Task = {
    label: '',
    completed: false
  }

  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => {
      this.resultTasks = this.tasks = tasks
    })
  }
  deleteTask(id: any) {
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id)
    }) 
  }

  persistsTask() {
    this.taskService.persist(this.myTask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
      this.showForm = false;
    })
    
  }

  resetTask() {
    this.myTask = {
      label: '',
      completed: false
    }
  }

  toggleCompleted(task: Task){
    this.taskService.completed(task.id, task.completed)
    .subscribe(() => {
      task.completed = !task.completed;
    })
  }

  editTask(task: Task) {
    this.myTask = task;
    this.editForm = true;
  }

  updateTask() {
    this.taskService.update(this.myTask)
    .subscribe(() => {
      this.resetTask();
      this.editForm = false;

    })
  }

  searchTasks() {
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }

}
