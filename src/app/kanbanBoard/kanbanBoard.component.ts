import {Component, OnInit, DoCheck} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit, DoCheck {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  nuevo: string='';

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 }
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  ngDoCheck(){
    console.log("se lanza DoCkeck");
    this.configureTasksForRendering();
  }

  crear = () =>{
    console.log("entramos a crear: "+this.nuevo);
    if(this.nuevo.length > 0){
      console.log(this.tasks);
      let task: any;
      task = {name: this.nuevo, stage: 0};
      this.tasks.push(task);
      this.nuevo="";
    }
    console.log(this.tasks);
  }

  regresar = (nombre) =>{
    for (let task of this.tasks) {
      if (task.name === nombre)
        if (task.stage > 0)
          task.stage -= 1;
    }
  }

  avanzar = (nombre) =>{
    for (let task of this.tasks) {
      if (task.name === nombre)
        if (task.stage < 3)
          task.stage += 1;
    }
  }

  eliminar = (nombre) =>{
    let tasksAux: Task[];
    tasksAux = [];
    for (let task of this.tasks) {
      if (task.name != nombre)
        tasksAux.push(task);
    }
    this.tasks = tasksAux;
  }

}

interface Task {
  name: string;
  stage: number;
}