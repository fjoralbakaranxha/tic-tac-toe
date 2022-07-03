import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'tic-tac-toe';

logsFromBoardToLogs : any;

  constructor() {};


  fwdLogsToLogs($event: any) {
     this.logsFromBoardToLogs = $event;
     console.log($event);
     }

 
 
}

