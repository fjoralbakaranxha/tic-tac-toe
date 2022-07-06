import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  @Input() logs!: any [];
  @Output() logsToBoard = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void  {
  }

  onLogClicked(index: number){
    this.logsToBoard.emit(index)
  }
}
