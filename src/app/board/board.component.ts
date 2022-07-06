    import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

    @Component({
      selector: 'app-board',
      templateUrl: './board.component.html',
      styleUrls: ['./board.component.css']
    })
    export class BoardComponent implements OnInit {
      squares!: any[];
      xNext!: boolean;
      winner!: string;
      logs: any = [];
      winnerName: any;
      
      @Input() currentPlayer1Name!: any;
      @Input() currentPlayer2Name!: any;
      @Input() logsFromLogsToBoard!: any;
      @Output() logsToLogs = new EventEmitter<any>();

      constructor() { 
      }

      logsToSib() {
        this.logsToLogs.emit(this.logs)
      }


      ngOnInit(): void  {
      }

      ngOnChanges() {
        this.onLogCellClicked()
      }

      onLogCellClicked() {
        if(!this.squares) return;
        const logIndexes = this.logs.slice(0, +this.logsFromLogsToBoard + 1).map((log: any) => log.cordinate);

        const newSquares = this.squares.map((square: any, index: number) => {     //
          if(logIndexes.includes(index)) {                       //a ekziston indexi i square te boardit tek logs
            if((logIndexes.indexOf(index) + 1) % 2 === 0) { // nqs ekzistojne kontrollon nese indexi i squares ne logs eshte i plotpj me 2, dhe rikthen O perndryshe rikthen X.
              return 'O'
            }
            return 'X'
          };
          return 0;
        });

        this.squares = newSquares;
      }

      startGame() {
        this.squares = Array(9).fill(0);
        this.xNext = true;
        this.winner = '';
        this.logs = [];
        this.logsToSib();
      }

      private checkIf2Players() {
        if(this.currentPlayer1Name && this.currentPlayer2Name) return true;
        return false;
      }

      get player() {
        if(this.checkIf2Players()) {
          return this.xNext ? this.currentPlayer1Name : this.currentPlayer2Name;
        }
        return this.xNext ? 'You' : 'Computer';
      }

      computerMove() {
        var emptyCells: any = [];
        var random;                                                                                                         // empty cells mban index e square qe jane bosh. random eshte index qe do marrim nga empty cells. 
        this.squares.forEach(function(cell, index){
          if (cell == 0) {                                                                                                  //nqs square = 0 e shton te empty cells
            emptyCells.push(index);
          }
        });
        
        if(emptyCells.length === 0) return;

        random = emptyCells[Math.ceil(Math.random() * emptyCells.length) - 1];                                                 //zgjidhet nje index random nga empty cells
        this.makeMove(random);
      }

      makeMove(idx: number) {        
        if(this.logs.length > 0 && this.logsFromLogsToBoard && +this.logsFromLogsToBoard < this.logs.length - 1) return;       // kontrollon nqs ka logs, kontrollon nqs logfromlogstoboard ka vlere dhe nqs logsfromlogstoboard eshte me i vogel se index i elementit te fundit. nqs plotesohen keto nuk behet move.
        
        if (this.winner || this.squares[idx]) {      
          return;
        }
        if (!this.squares[idx]) {
          this.squares.splice(idx, 1, this.xNext ? 'X' : 'O');
        }
        
        this.winner = this.calculateWinner();
        if(this.checkIf2Players()) {
          if(this.winner === 'X') {
              this.winnerName = this.currentPlayer1Name;
          } else {
              this.winnerName = this.currentPlayer2Name;
          }
      } else {
          if(this.winner === 'X') {
              this.winnerName = 'You';
          } else {
              this.winnerName = 'Computer';
          }
      }
      
        
        this.logs.push({
            'player': this.player,
            'cordinate': idx
        });
        if(this.logsFromLogsToBoard) Number(this.logsFromLogsToBoard++);

        this.xNext = !this.xNext;
        this.logsToSib();

        if(!this.checkIf2Players() && !this.xNext) this.computerMove();
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

      


