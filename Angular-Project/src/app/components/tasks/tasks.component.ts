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
  myTask: Task = {
    label: '',
    completed: false
  }

  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => this.tasks = tasks)
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
}
