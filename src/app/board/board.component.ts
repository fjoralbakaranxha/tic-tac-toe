    import { Component, OnInit, Output, EventEmitter } from '@angular/core';

    @Component({
      selector: 'app-board',
      templateUrl: './board.component.html',
      styleUrls: ['./board.component.css']
    })
    export class BoardComponent implements OnInit {
      squares!: any[];
      xNext!: boolean;
      winner!: string;
      players: boolean = true;
      showTextBox: boolean = false;
      logs: any = [];
      
      @Output() logsToLogs = new EventEmitter<any>();
 

      constructor() { }

      logsToSib() {
        this.logsToLogs.emit(this.logs)
      }

      togglePlayer(): void {
        this.players = !this.players;
        this.showTextBox = !this.showTextBox; 
    }

      ngOnInit(): void  {
      }

      startGame() {
        this.squares = Array(9).fill(0);
        this.xNext = true;
        this.logs = [];
        this.winner = '';
      }

      get player() {
        return this.xNext ? 'X' : 'O';
      }

      makeMove(idx: number) {
        if (this.winner) {
          return;
        }
        if (!this.squares[idx]) {
          this.squares.splice(idx, 1, this.player);
          this.xNext = !this.xNext;
        }
        
        this.winner = this.calculateWinner();
        
        this.logs.push({
            'player': this.player,
            'cordinate': idx
        });
        this.logsToSib();
      }
  

      calculateWinner(){
        const lines = [
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [0,3,6],
          [1,4,7],
          [2,5,8],
          [0,4,8],
          [2,4,6]
        ];
    
        for (let i = 0; i < lines.length; i++) {
          const [a,b,c] = lines[i];
          if (
            this.squares[a] &&
            this.squares[a] === this.squares[b] &&
            this.squares[a] === this.squares[c]
          ) {
            return this.squares[a];
          }
        }
        return null;
      }
    }

      


