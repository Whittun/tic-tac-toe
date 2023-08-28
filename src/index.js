import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      xIsNext: true,
      counter: 0,
    }
  }

  showStatus() {
    const history = this.state.history.slice(0, this.state.counter + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const winner = isWinner(squares);
    let status;
    if (winner) {
      status = <div className="game__message-blur game__winner-blur">
        <span className="game__winner">WINNER:</span>
        <div className="game__winner-figure-wrapper">
          {winner}
          <div className="game__winner-crown">
            <svg width="122" height="87" viewBox="0 0 122 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_f_304_678)">
              <path d="M42.1694 43.9167L60.6486 23.705L79.1279 43.9167L80.973 45.9347L82.818 43.9167L98.7973 26.4393V64.5H22.5V26.4393L38.4793 43.9167L40.3243 45.9347L42.1694 43.9167Z" stroke="#F19A16" stroke-width="5"/>
              </g>
              <g filter="url(#filter1_f_304_678)">
              <path d="M46.8451 46.1869L61 30.705L75.1549 46.1869L77 48.205L78.8451 46.1869L90.5 33.4393V61.5H31.5V33.4393L43.1549 46.1869L45 48.205L46.8451 46.1869Z" stroke="#E8A034" stroke-width="5"/>
              </g>
              <path d="M46.8451 46.1869L61 30.705L75.1549 46.1869L77 48.205L78.8451 46.1869L90.5 33.4393V61.5H31.5V33.4393L43.1549 46.1869L45 48.205L46.8451 46.1869Z" stroke="#FEFFBB" stroke-width="5"/>
              <defs>
              <filter id="filter0_f_304_678" x="0" y="0" width="121.297" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_304_678"/>
              </filter>
              <filter id="filter1_f_304_678" x="19" y="17" width="84" height="57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_304_678"/>
              </filter>
              </defs>
            </svg>
          </div>
        </div> 
      </div>
    } else if (drawTest(squares)) {
      status = <div className="game__draw-blur game__message-blur">
        <span className="game__draw">DRAW!</span>
      </div>;
    } else {
      status = <div className="game__next-move-blur game__message-blur">
        <span className="game__next-move">NEXT MOVE!</span>
      </div>;
    }

    return status
  }

  squareClick(i) {
    const history = this.state.history.slice(0, this.state.counter + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (current.squares[i] || isWinner(squares)) return;

    let value = this.state.xIsNext ? 
      <svg type="X" xmlns="http://www.w3.org/2000/svg" width="112" height="111" viewBox="0 0 112 111" fill="none">
        <g filter="url(#filter0_f_304_73)">
        <path d="M22.1406 22.6274C23.6874 21.104 26.1704 21.104 27.7172 22.6274L29.4594 24.3431L90.0107 83.9771C91.5913 85.5337 91.5913 88.0829 90.0107 89.6395C88.464 91.1628 85.9809 91.1628 84.4341 89.6395L23.5603 29.688L22.1406 28.2898C20.5601 26.7332 20.5601 24.184 22.1406 22.6274Z" fill="#FF2E21"/>
        <path d="M90.0107 21.5119C91.5913 23.0685 91.5913 25.6177 90.0107 27.1743L27.7172 88.524C26.1704 90.0473 23.6874 90.0473 22.1406 88.524C20.5601 86.9674 20.5601 84.4182 22.1406 82.8616L84.4342 21.5119C85.9809 19.9886 88.464 19.9886 90.0107 21.5119Z" fill="#FF2E21"/>
        </g>
        <g filter="url(#filter1_f_304_73)">
        <path d="M25.9112 26.2882C27.2861 24.9341 29.4932 24.9341 30.8681 26.2882L32.4167 27.8133L86.2402 80.8212C87.6451 82.2049 87.6451 84.4708 86.2402 85.8545C84.8653 87.2085 82.6581 87.2085 81.2832 85.8545L27.1731 32.5642L25.9112 31.3214C24.5063 29.9378 24.5063 27.6718 25.9112 26.2882Z" fill="#F98F54"/>
        <path d="M86.2402 25.2966C87.6451 26.6803 87.6451 28.9463 86.2402 30.3299L30.8681 84.8629C29.4932 86.217 27.2861 86.217 25.9112 84.8629C24.5063 83.4793 24.5063 81.2133 25.9112 79.8297L81.2832 25.2966C82.6581 23.9426 84.8653 23.9426 86.2402 25.2966Z" fill="#F98F54"/>
        </g>
        <path d="M25.9112 26.2882C27.2861 24.9341 29.4932 24.9341 30.8681 26.2882L32.4167 27.8133L86.2402 80.8212C87.6451 82.2049 87.6451 84.4708 86.2402 85.8545C84.8653 87.2085 82.6581 87.2085 81.2832 85.8545L27.1731 32.5642L25.9112 31.3214C24.5063 29.9378 24.5063 27.6718 25.9112 26.2882Z" fill="#FDFEFA"/>
        <path d="M86.2402 25.2966C87.6451 26.6803 87.6451 28.9463 86.2402 30.3299L30.8681 84.8629C29.4932 86.217 27.2861 86.217 25.9112 84.8629C24.5063 83.4793 24.5063 81.2133 25.9112 79.8297L81.2832 25.2966C82.6581 23.9426 84.8653 23.9426 86.2402 25.2966Z" fill="#FDFEFA"/>
        <defs>
        <filter id="filter0_f_304_73" x="0.9552" y="0.369385" width="110.241" height="110.413" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_304_73"/>
        </filter>
        <filter id="filter1_f_304_73" x="14.8574" y="14.281" width="82.4364" height="82.5891" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_304_73"/>
        </filter>
        </defs>
      </svg>
       /*"X"*/:
      <svg type="O" xmlns="http://www.w3.org/2000/svg" width="123" height="123" viewBox="0 0 123 123" fill="none">
        <g filter="url(#filter0_f_304_77)">
        <circle cx="61.409" cy="61.5757" r="38.4458" stroke="#1A44DC" strokeWidth="5"/>
        </g>
        <g filter="url(#filter1_f_304_77)">
        <circle cx="61.4091" cy="61.5756" r="32.9536" stroke="#40A4ED" strokeWidth="5"/>
        </g>
        <circle cx="61.4091" cy="61.5756" r="32.9536" stroke="#A6F0FF" strokeWidth="5"/>
        <defs>
        <filter id="filter0_f_304_77" x="0.463196" y="0.629883" width="121.892" height="121.892" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_304_77"/>
        </filter>
        <filter id="filter1_f_304_77" x="15.9555" y="16.1221" width="90.9071" height="90.9072" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_304_77"/>
        </filter>
        </defs>
      </svg>/*"O"*/;
    squares[i] = value;
    
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      xIsNext: !this.state.xIsNext,
      counter: history.length,
    });
  }

  goToMove(i) {
    this.setState({
      counter: i,
      xIsNext: (i % 2) === 0
    });
  }

  navigateStep(direction) {
    if (direction === "back" && this.state.counter > 0) {
      this.goToMove(this.state.counter - 1);
    } else if (direction === "next" && this.state.counter !== this.state.history.length - 1) {
      this.goToMove(this.state.counter + 1);
    }
  }

  render () {
    const history = this.state.history.slice(0, this.state.counter + 1);
    const current = history[history.length - 1];

    return (
      <div id="app">
        <main className="game">
          <div className="game__up-wrapper">
            <div className={"game__x-info game__info " + (this.state.xIsNext ? "active": "") + ((isWinner(current.squares) || drawTest(current.squares)) ? " display-none" : "")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="148" height="153" viewBox="0 0 148 153" fill="none">
                <g filter="url(#filter0_f_331_3)">
                <path d="M32.5144 23.7207C34.4053 21.8584 37.4408 21.8584 39.3318 23.7207L41.4615 25.8182L115.486 98.7207C117.418 100.624 117.418 103.74 115.486 105.643C113.595 107.505 110.559 107.505 108.668 105.643L34.25 32.3523L32.5144 30.643C30.5822 28.74 30.5822 25.6236 32.5144 23.7207Z" fill="#FF2E21"/>
                <path d="M115.486 22.357C117.418 24.26 117.418 27.3764 115.486 29.2793L39.3318 104.279C37.4408 106.142 34.4053 106.142 32.5144 104.279C30.5822 102.376 30.5822 99.26 32.5144 97.357L108.668 22.357C110.559 20.4948 113.595 20.4948 115.486 22.357Z" fill="#FF2E21"/>
                </g>
                <g filter="url(#filter1_f_331_3)">
                <path d="M37.1239 28.1962C38.8047 26.5408 41.503 26.5408 43.1838 28.1962L45.0769 30.0606L110.876 94.8628C112.594 96.5543 112.594 99.3245 110.876 101.016C109.195 102.671 106.497 102.671 104.816 101.016L38.6667 35.8687L37.1239 34.3493C35.4064 32.6578 35.4064 29.8877 37.1239 28.1962Z" fill="#F98F54"/>
                <path d="M110.876 26.984C112.594 28.6755 112.594 31.4457 110.876 33.1372L43.1838 99.8038C41.503 101.459 38.8047 101.459 37.1239 99.8038C35.4064 98.1123 35.4064 95.3422 37.1239 93.6507L104.816 26.984C106.497 25.3287 109.195 25.3287 110.876 26.984Z" fill="#F98F54"/>
                </g>
                <path d="M37.1239 28.1962C38.8047 26.5408 41.503 26.5408 43.1838 28.1962L45.0769 30.0606L110.876 94.8628C112.594 96.5543 112.594 99.3245 110.876 101.016C109.195 102.671 106.497 102.671 104.816 101.016L38.6667 35.8687L37.1239 34.3493C35.4064 32.6578 35.4064 29.8877 37.1239 28.1962Z" fill="#FDFEFA"/>
                <path d="M110.876 26.984C112.594 28.6755 112.594 31.4457 110.876 33.1372L43.1838 99.8038C41.503 101.459 38.8047 101.459 37.1239 99.8038C35.4064 98.1123 35.4064 95.3422 37.1239 93.6507L104.816 26.984C106.497 25.3287 109.195 25.3287 110.876 26.984Z" fill="#FDFEFA"/>
                <g filter="url(#filter2_f_331_3)">
                <rect x="20" y="129" width="108" height="4" rx="2" fill="#FF2E21"/>
                </g>
                <g filter="url(#filter3_f_331_3)">
                <rect x="20" y="129" width="108" height="4" rx="2" fill="#F98F54"/>
                </g>
                <rect x="20" y="129" width="108" height="4" rx="2" fill="#FDFEFA"/>
                <defs>
                <filter id="filter0_f_331_3" x="11.0652" y="0.960449" width="125.87" height="126.079" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_331_3"/>
                </filter>
                <filter id="filter1_f_331_3" x="25.8358" y="15.7424" width="96.3284" height="96.5151" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_331_3"/>
                </filter>
                <filter id="filter2_f_331_3" x="0" y="109" width="148" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_331_3"/>
                </filter>
                <filter id="filter3_f_331_3" x="10" y="119" width="128" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_331_3"/>
                </filter>
                </defs>
              </svg>
            </div>
            <p className="game__message">{this.showStatus()}</p>
            <div className={"game__o-info game__info " + (!this.state.xIsNext ? "active": "") + ((isWinner(current.squares) || drawTest(current.squares)) ? " display-none" : "")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="148" height="158" viewBox="0 0 148 158" fill="none">
                <g filter="url(#filter0_f_331_22)">
                <rect x="20" y="134" width="108" height="4" rx="2" fill="#1A44DC"/>
                </g>
                <g filter="url(#filter1_f_331_22)">
                <rect x="20" y="134" width="108" height="4" rx="2" fill="#40A4ED"/>
                </g>
                <rect x="20" y="134" width="108" height="4" rx="2" fill="#A6F0FF"/>
                <g filter="url(#filter2_f_331_22)">
                <circle cx="74" cy="67" r="44.5" stroke="#1A44DC" strokeWidth="5"/>
                </g>
                <g filter="url(#filter3_f_331_22)">
                <circle cx="74.0001" cy="66.9998" r="37.7857" stroke="#40A4ED" strokeWidth="5"/>
                </g>
                <circle cx="74.0001" cy="66.9998" r="37.7857" stroke="#A6F0FF" strokeWidth="5"/>
                <defs>
                <filter id="filter0_f_331_22" x="0" y="114" width="148" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_331_22"/>
                </filter>
                <filter id="filter1_f_331_22" x="10" y="124" width="128" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_331_22"/>
                </filter>
                <filter id="filter2_f_331_22" x="7" y="0" width="134" height="134" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_331_22"/>
                </filter>
                <filter id="filter3_f_331_22" x="23.7144" y="16.7141" width="100.571" height="100.572" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_331_22"/>
                </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="game__board-wrapper">
            <Arrows onClick={() => this.navigateStep("back")} position={"back"}/>
            <Board onClick={(i) => this.squareClick(i)} history={history} counter={this.state.counter}/>
            <Arrows onClick={() => this.navigateStep("next")} position={"forward"}/>
          </div>
        </main>
        <History onClick={(i) => this.goToMove(i)} history={this.state.history}/>
      </div>
    )
  }
}

class Board extends React.Component {
  squareOutput(i) {
    const history = this.props.history;
    const current = history[this.props.counter];

    return current.squares[i];
  }

  render() {
    const history = this.props.history;
    const current = history[history.length - 1];

    return (
      <div className="board">
        <div className="board__row">
          <Square square={current.squares} value={this.squareOutput(0)} onClick={() => this.props.onClick(0)}/>
          <Square square={current.squares} value={this.squareOutput(1)} onClick={() => this.props.onClick(1)}/>
          <Square square={current.squares} value={this.squareOutput(2)} onClick={() => this.props.onClick(2)}/>
        </div>
        <div className="board__row">
          <Square square={current.squares} value={this.squareOutput(3)} onClick={() => this.props.onClick(3)}/>
          <Square square={current.squares} value={this.squareOutput(4)} onClick={() => this.props.onClick(4)}/>
          <Square square={current.squares} value={this.squareOutput(5)} onClick={() => this.props.onClick(5)}/>
        </div>
        <div className="board__row">
          <Square square={current.squares} value={this.squareOutput(6)} onClick={() => this.props.onClick(6)}/>
          <Square square={current.squares} value={this.squareOutput(7)} onClick={() => this.props.onClick(7)}/>
          <Square square={current.squares} value={this.squareOutput(8)} onClick={() => this.props.onClick(8)}/>
        </div>
      </div>
    )
  }
}

class Arrows extends React.Component {
  render() {
    return (
      <button onClick={() => {this.props.onClick()}} className={"game__arrow-" + this.props.position}>{this.props.position}</button>
    )
  }
}

class Square extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={
        "board__square" + 
        ((isWinner(this.props.square) || drawTest(this.props.square)) ?
        " disabled" :
        ""
        )
      }
      >
        {this.props.value}
      </div>
    )
  }
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    }
  }
  
  menuToggle() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    })
  }

  historyClick(i) {
    this.menuToggle();
    this.props.onClick(i);
  }

  render() {
    const menuState = this.state.menuIsOpen;
    return (
      <footer className={"history" + (menuState ? " history--inactive" : "")}>
        <div className="container">
          <button onClick={() => this.menuToggle()} className={"history__toggle"}>
            Move history
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="24" viewBox="0 0 54 24" fill="none">
              <path d="M2 2L27 22L52 2" stroke="#438796" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </button>
          <ul className="history__list">
            {this.props.history.map((elem, i) => (
              <li onClick={() => this.historyClick(i)} className="history__item">
                {elem.squares.map((square) => (
                  <div className="history__square">{square}</div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </footer>
    )
  }
}

function isWinner(squares) {
  const winningIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i <= winningIndexes.length - 1; i++) {
    let [a, b, c] = winningIndexes[i];
    
    if (
      squares[a]?.props.type &&
      squares[a]?.props.type ===
      squares[b]?.props.type &&
      squares[a]?.props.type ===
      squares[c]?.props.type
    ) {
      return squares[a];
    }
  }
  return null
}

function drawTest(squares) {
  for (let i = 0; i <= squares.length - 1; i++) {
    if (squares[i] === null) return;
  }

  if (!isWinner(squares)) return true;
}

root.render(<Game />);