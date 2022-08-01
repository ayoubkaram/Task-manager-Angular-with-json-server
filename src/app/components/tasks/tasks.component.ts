import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[]=[];
  myTask:Task = {
    formation:'',
    completed:false
  };
  editForm= false;
  showForm= false;
  searchText='';
  resultTasks: Task[]=[];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(){
    this.taskService.findAll()
        .subscribe(tasks=>{
          this.resultTasks =this.tasks= tasks;
        })
  }

  deleteTask(id :number|undefined){
    this.taskService.delete(id)
        .subscribe(() =>{
          this.resultTasks =this.tasks = this.tasks.filter(tasks =>tasks.id != id)
        })
  }

  persistTask(){
    return this.taskService.persist(this.myTask)
               .subscribe((task)=>{
                this.resultTasks =this.tasks = [task,...this.tasks];
                this.resetTask();
                this.showForm = false
               })
  }

  resetTask(){
    this.myTask={
      "formation":'',
      "completed": false
    }
  }

  toggleCompleted(task: any){
    return this.taskService.completed(task.id, task.completed)
               .subscribe(()=>{
                task.completed = !task.completed
               })
  }

  editTask(task: any){
    this.myTask = task;
    this.showForm= true;
    this.editForm=true;
  }

  updateTask(){
    return this.taskService.update(this.myTask)
               .subscribe(task=>{
                this.resetTask();
                this.editForm = false;
                this.showForm = false;
               })
  }

  showFormFunction(){
    this.showForm = true;
  }

  searchTasks(){
    return this.resultTasks = this.tasks.filter((task)=> task.formation.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
