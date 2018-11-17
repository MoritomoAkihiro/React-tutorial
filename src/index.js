import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
// //stateを持っていないためコンストラクタを消した。
//   render() {
//     return (
//       //buttonクリックすると、親からの（boare）onClickが呼び出される
//       <button className="square"　onClick={()=>this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  //初期化してる
  constructor(){
    super();
    //stateの初期化
    this.state={
      squares:Array(9).fill(null),//これで、boardコンポーネントが〇×のstateを保持している
      xIsNext:true,//順番を決める
    };
  }
  handleClick(i){
    //slice()は配列を抜き出す関数なので、なくてもいいが、イミュータブルと言う概念の元これを使っている？
    const squares = this.state.squares.slice();
    //すでに勝者が決まっているときはreturnする
    if (calculateWinner(squares)||squares[i]){
      return;
    }
    //stateのxIsNextがどうかで次置かれるやつがXかOか決まる
    squares[i] = this.state.xIsNext ? 'X':'O';
    //squaresをコンストラクターで初期化したsquaresからここで定義したconstのsquaresに入れなおす
    //Stateをそれぞれ設定する。
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,//!で逆の方にする。
    });
  }
  //後のrenderSquareをここで定義している
  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]}
        onClick={()=> this.handleClick(i)}
        />//onClickに新しい関数を代入している
      );
    }
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner:'+winner;
    }else{
      status='Next player:'+(this.state.xIsNext? 'X':'O');
    }

    // const status = 'Next player: '+(this.state.xIsNext ? 'X':'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

//上のGameコンポーネントでレンダリングされたDOMが入る
ReactDOM.render(
  <Game />,
  document.getElementById('container')
);
//勝利者をきめるやつ
function calculateWinner(squares) {
  const lines = [
    //縦横斜めのラインを定義
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //9回見直す。
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //型まで比較する厳密透過演算子a,b,c,同じマークであったらif文が通る。
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
