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
logsFromLogsToBoard : any;

currentPlayer1Name : any;
currentPlayer2Name : any;

  constructor() {};


  fwdLogsToLogs($event: any) {
     this.logsFromBoardToLogs = $event;
     }

  fwdLogsToBoard($event: any) { 
    this.logsFromLogsToBoard = $event; 
  }
 
  fwdPlayer1NameToBoard($event: any) {
    this.currentPlayer1Name = $event;
  }

  fwdPlayer2NameToBoard($event: any) {
    this.currentPlayer2Name = $event;
  }
}

