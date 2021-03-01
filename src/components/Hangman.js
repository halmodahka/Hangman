import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./Words.js";
import { GiHalfDead } from "react-icons/gi";

import step0 from "./images/step0.jpg";
import step1 from "./images/step1.jpg";
import step2 from "./images/step2.jpg";
import step3 from "./images/step3.jpg";
import step4 from "./images/step4.jpg";
import step5 from "./images/step5.jpg";
import step6 from "./images/step6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
  };

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    };
  }

  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "qwertyuiopasdfghjklzxcvbnm ".split("").map((letter) => (
      <button
        class="btn btn-lg btn-warning m-2 btn-default"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord(),
    });
  };

  render() {
    const Loser = this.state.mistake >= this.props.maxWrong;
    const Winner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (Winner) {
      gameStat = "YOU PASSED!";
    }

    if (Loser) {
      gameStat = "YOU ARE DEAD!";
    }

    return (
      <div className="Hangman container">
        <h1 className="text-center">
          {" "}
          <GiHalfDead /> The Suicide Trap
        </h1>
        <div className="float-right">
          Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
        </div>

        <div className="text-center">
          <img
            src={this.props.images[this.state.mistake]}
            alt=""
            width="450px"
            style={{ marginLeft: 20, marginTop: 50 }}
          />
        </div>

        <div className="text-center">
          <p>Guess the DC Character:</p>
          <p>{!Loser ? this.guessedWord() : this.state.answer}</p>
          <br></br>
          <br></br>
          <p>{gameStat}</p>
          <button className="btn btn-info" onClick={this.resetButton}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
