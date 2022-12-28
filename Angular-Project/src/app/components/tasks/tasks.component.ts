import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  constructor(private taskService: TaskService) {}
  tasks: Task[] = [];
  
  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => this.tasks = tasks)
  }
// subscribe c'est une fonsction anonyme.
  deleteTask(id: any) {
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id)
    }) 
  }
}
