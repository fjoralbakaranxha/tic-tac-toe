import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() player1Name = new EventEmitter<any>();
  @Output() player2Name = new EventEmitter<any>();

  players: boolean = true;
  showTextBox: boolean = false;
  currentPlayer1Name: string = '';
  currentPlayer2Name: string = '';
  timeout: any = null;

  constructor() { }


  togglePlayer(): void {
        this.players = !this.players;
        this.showTextBox = !this.showTextBox;
          this.currentPlayer1Name = '';
          this.currentPlayer2Name = '';

          this.player1Name.emit('');
          this.player2Name.emit('');
    }

  ngOnInit(): void {
  }

  onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
        $this.player1Name.emit($this.currentPlayer1Name);
        $this.player2Name.emit($this.currentPlayer2Name);
    }, 500);
  }
}
